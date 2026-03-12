import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing webhook signature or secret" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Update payment status in database
      const paymentsDb = await getCollection("payments");
      
      await paymentsDb.updateOne(
        { stripeSessionId: session.id },
        {
          $set: {
            status: "completed",
            transactionId: session.payment_intent,
            stripePaymentIntentId: session.payment_intent,
            updatedAt: new Date(),
          },
        }
      );

      // Optionally: Add course access to user
      if (session.metadata?.userId && session.metadata?.courseId) {
        const usersDb = await getCollection("users");
        await usersDb.updateOne(
          { _id: session.metadata.userId },
          {
            $addToSet: {
              enrolledCourses: session.metadata.courseId,
            },
          }
        );
      }
    }

    // Handle payment intent failed
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;

      const paymentsDb = await getCollection("payments");
      await paymentsDb.updateOne(
        { stripePaymentIntentId: paymentIntent.id },
        {
          $set: {
            status: "failed",
            updatedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}
