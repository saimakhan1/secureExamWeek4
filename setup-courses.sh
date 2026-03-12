#!/bin/bash

# Quick Setup Script for Online Courses & Payments Feature

echo "======================================"
echo "🎓 Online Courses & Payments Setup"
echo "======================================"
echo ""

# Check if node_modules/stripe exists
if [ -d "node_modules/stripe" ]; then
    echo "✅ Stripe package already installed"
else
    echo "📦 Installing Stripe package..."
    npm install stripe
    echo "✅ Stripe package installed"
fi

echo ""
echo "======================================"
echo "📝 Next Steps:"
echo "======================================"
echo ""
echo "1️⃣  Update your .env file with Stripe webhook secret:"
echo "   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx"
echo ""
echo "2️⃣  Seed sample courses (optional):"
echo "   node seedCourses.js"
echo ""
echo "3️⃣  Start the development server:"
echo "   npm run dev"
echo ""
echo "4️⃣  Access the features:"
echo "   - Online Courses: http://localhost:3000/dashboard/student/online-courses"
echo "   - Payment History: http://localhost:3000/dashboard/student/payment-history"
echo ""
echo "5️⃣  Configure Stripe Webhook:"
echo "   - Go to https://dashboard.stripe.com/developers/webhooks"
echo "   - Add endpoint: https://yourdomain.com/api/payments/webhook"
echo "   - Events: checkout.session.completed, payment_intent.payment_failed"
echo ""
echo "======================================"
echo "🧪 Test Payment Card:"
echo "======================================"
echo "   Card: 4242 4242 4242 4242"
echo "   Expiry: 12/25 (or any future date)"
echo "   CVC: 123 (any 3 digits)"
echo ""
echo "======================================"
echo "📚 Documentation:"
echo "======================================"
echo "   - IMPLEMENTATION_SUMMARY.md"
echo "   - COURSES_PAYMENTS_SETUP.md"
echo ""
echo "✨ Feature setup complete!"
echo "======================================"
