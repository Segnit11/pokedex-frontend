import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Only run Clerk middleware when a publishable key is configured; otherwise the
// app runs in public mode and the middleware is a no-op.
const authEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default authEnabled ? clerkMiddleware() : () => NextResponse.next();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
