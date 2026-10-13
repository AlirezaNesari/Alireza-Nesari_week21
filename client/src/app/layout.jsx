import { AuthProvider } from "../features/auth/AuthContext";

import "./globals.css";

export const metadata = {
  title: "client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}