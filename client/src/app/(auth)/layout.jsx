import { GuestRoute } from "../../features/auth/RouteGuard";

export default function AuthLayout({ children }) {
  return <GuestRoute>{children}</GuestRoute>;
}