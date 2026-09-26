import { AuthProvider } from "../context/AuthContext";

import "./globals.css";

export const metadata = {
  title: "مدیریت کالا",
  description: "Warehouse Product Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}