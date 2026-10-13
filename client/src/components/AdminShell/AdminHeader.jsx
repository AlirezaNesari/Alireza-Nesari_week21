"use client";

import Image from "next/image";

import { useAuth } from "../../features/auth/AuthContext";

import SearchBox from "./SearchBox";

import styles from "./AdminShell.module.css";

export default function AdminHeader() {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <SearchBox />

      <div className={styles.userProfile}>
        <Image
          src="/images/ali.png"
          alt="ali"
          width={31}
          height={31}
          className={styles.avatar}
        />

        <div className={styles.userInfo}>
          <span>علیرضا نثاری</span>
          <small>مدیر</small>
        </div>

        <button type="button" className={styles.logoutButton} onClick={logout}>
          خروج
        </button>
      </div>
    </header>
  );
}