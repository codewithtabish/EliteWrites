import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  loginPage: "/api/auth/login",
  isReturnToCurrentPage: true, // Redirects users back after login
});

export const config = {
  matcher: ["/onboarding", "/projects", "/dashboard/:path*"], // Ensuring `/dashboard/*` is fully protected
};
