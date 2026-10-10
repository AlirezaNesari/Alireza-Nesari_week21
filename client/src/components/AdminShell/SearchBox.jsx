"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildUrl } from "@/lib/url";

import styles from "./AdminShell.module.css";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlName = searchParams.get("name") ?? "";

  const [value, setValue] = useState(urlName);
  const [syncedUrlName, setSyncedUrlName] = useState(urlName);

  if (urlName !== syncedUrlName) {
    setSyncedUrlName(urlName);

    if (urlName !== value.trim()) {
      setValue(urlName);
    }
  }

  const handleChange = (event) => {
    const newValue = event.target.value;
    const name = newValue.trim();

    setValue(newValue);

    if (name === urlName) {
      return;
    }

    router.replace(buildUrl(pathname, searchParams, { name, page: 1 }));
  };

  return (
    <div className={styles.searchBox}>
      <span className={styles.searchIcon}>⌕</span>

      <input
        type="text"
        placeholder="جستجو کالا"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}