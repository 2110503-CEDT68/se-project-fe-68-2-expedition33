import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Next.js 16 Proxy with Next-Auth integration.
 * (Formerly known as Middleware)
 * 
 * Note: Following user preference, specific role redirects and authenticated-user 
 * redirects are handled at the page/layout level. This proxy handles basic 
 * authentication gatekeeping for protected routes.
 */
const proxyHandler = withAuth(
  function middleware(req) {
    // The middleware function can now be a simple pass-through or 
    // handle very specific network-level tasks.
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Determines if a user is authorized to access a route.
       * Returning 'false' will trigger a redirect to the sign-in page.
       */
      authorized: ({ token, req }) => {
        const { pathname } = new URL(req.url);
        
        // Define public routes that don't require authentication
        const isPublicRoute = 
          pathname === "/" || 
          pathname === "/api/auth/login" || 
          pathname === "/api/auth/register" ||
          pathname.startsWith("/companies") ||
          pathname.startsWith("/test");

        if (isPublicRoute) return true;

        // For all other routes (like /bookings, /payments, /api/auth/profile), 
        // the user MUST be authenticated.
        return !!token;
      },
    },
    pages: {
      signIn: "/api/auth/login",
    },
  }
);

// In Next.js 16, the standard export is named 'proxy'
export { proxyHandler as proxy };

/**
 * Configure which paths the proxy should run on.
 */
export const config = {
  matcher: [
    "/",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/profile",
    "/payments/:path*",
    "/bookings/:path*",
    "/companies/:path*",
    "/test/:path*",
  ],
};
