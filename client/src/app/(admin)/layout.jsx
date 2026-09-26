import AuthGuard from "../../components/AuthGuard/AuthGuard";

export default function AdminLayout({
  children,
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}