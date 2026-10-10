import { Suspense } from "react";

import AdminHeader from "./AdminHeader";

import styles from "./AdminShell.module.css";

export default function AdminShell({ children }) {
  return (
    <div className={styles.layout} dir="rtl">
      <Suspense fallback={null}>
        <AdminHeader />
      </Suspense>

      <main className={styles.content}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
}