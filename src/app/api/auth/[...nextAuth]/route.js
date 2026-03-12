// ----------- role added
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect";

import { logActivity } from "@/lib/activityLogger";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const usersCollection = await getCollection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          // If profile is already locked, block login immediately
          if (user.isLocked) {
            throw new Error(
              "Your profile is locked. Please reset your password.",
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          // Wrong password: increment failed attempts and lock after 3 tries
          if (!isPasswordCorrect) {
            const failedAttempts = user.failedLoginAttempts || 0;
            const updatedAttempts = failedAttempts + 1;

            const updateDoc = {
              $set: {
                failedLoginAttempts: updatedAttempts,
              },
            };

            if (updatedAttempts >= 3) {
              updateDoc.$set.isLocked = true;
            }

            await usersCollection.updateOne({ _id: user._id }, updateDoc);

            if (updatedAttempts >= 3) {
              throw new Error(
                "Your profile is locked. Please reset your password.",
              );
            }

            throw new Error("Wrong password");
          }

          // Role check
          if (credentials.role && credentials.role !== user.role) {
            throw new Error("Role mismatch");
          }

          // Activity Log for successful login
          await logActivity({
            userId: user._id.toString(),
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
            action: "logged_in",
            details: "User logged in",
          });

          // Successful login: reset failed attempts and unlock if needed
          if (user.failedLoginAttempts || user.isLocked) {
            await usersCollection.updateOne(
              { _id: user._id },
              {
                $set: {
                  failedLoginAttempts: 0,
                  isLocked: false,
                },
              },
            );
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };
        } catch (error) {
          console.log("Auth Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
