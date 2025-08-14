import { NextResponse } from "next/server";

// This function defines the middleware for role-based access control.
export function middleware(request) {
  // Get the user's role from a cookie.
  // We assume the role is stored in a cookie named 'role'.
  // In a real application, this would likely be part of a JWT or session cookie.
  const userRole = request.cookies.get("role")?.value;

  // Define the protected paths and the roles required to access them.
  // This object is a simple way to manage role-based permissions.
  // The key is the path prefix, and the value is the required role.
  const rolePermission = {
    "/admin": "ADMIN",
    "/candidate": "CANDIDATE",
    "/recruiter": "RECRUITER",
  };

  // Iterate over the defined permissions to check for a match.
  for (const path in rolePermission) {
    if (request.nextUrl.pathname.startsWith(path)) {
      const requiredRole = Array.isArray(rolePermission[path])
        ? rolePermission[path]
        : [rolePermission[path]];

      // Check if the user's role is included in the list of allowed roles for this path.
      if (!userRole || !requiredRole.includes(userRole)) {
        console.warn(
          `Access Denied to user with role '${userRole}' trying to access '${request.nextUrl.pathname}'`
        );
        // If the user does not have the required role, redirect them.
        // You can redirect to a custom 403 Forbidden page or the home page.
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

// The matcher configuration tells Next.js which paths this middleware should run on.
// This is more efficient than running the middleware on every single page.
export const config = {
  matcher: ["/admin/:path*", "/candidate/:path*", "/recruiter/:path*"],
};
