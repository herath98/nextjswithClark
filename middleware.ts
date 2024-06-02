import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create a route matcher for protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
  '/AboutUs',
  '/Product'
   // Add AboutUs route to the protected list
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();

    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
