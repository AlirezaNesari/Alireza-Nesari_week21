import AdminShell from "@/components/AdminShell/AdminShell";
import { ProtectedRoute } from "@/features/auth/RouteGuard";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}