"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./Auth.module.css";

export default function AuthCard({
  title,
  footerText,
  footerHref,
  isTall = false,
  children,
}) {
  const router = useRouter();

  const cardClassName = isTall ? `${styles.card} ${styles.tallCard}` : styles.card;

  return (
    <main className={styles.page} dir="rtl">
      <h1 className={styles.brand}>بوت کمپ بوتواستارت</h1>

      <div className={cardClassName}>
        <Image
          src="/images/Union.png"
          alt="Union"
          width={72}
          height={72}
          className={styles.logo}
          priority
        />

        <h2 className={styles.title}>{title}</h2>

        {children}

        <button
          type="button"
          className={styles.link}
          onClick={() => router.push(footerHref)}
        >
          {footerText}
        </button>
      </div>
    </main>
  );
}