import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import ali from "../assets/ali.png";
import { useAuth } from "../context/AuthContext";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    register,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: searchParams.get("name") || "",
    },
  });

  const searchValue = watch("name");

  useEffect(() => {
    reset({
      name: searchParams.get("name") || "",
    });
  }, [searchParams, reset]);

  useEffect(() => {
    const value = searchValue.trim();
    const currentSearch =
      searchParams.get("name") || "";

    if (value === currentSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }

    params.set("page", "1");

    setSearchParams(params, {
      replace: true,
    });
  }, [
    searchValue,
    searchParams,
    setSearchParams,
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.layout} dir="rtl">
      <header className={styles.header}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            ⌕
          </span>

          <input
            type="text"
            placeholder="جستجو کالا"
            {...register("name")}
          />
        </div>

        <div className={styles.userProfile}>
          <img
            src={ali}
            alt="ali"
            className={styles.avatar}
          />

          <div className={styles.userInfo}>
            <span>علیرضا نثاری</span>
            <small>مدیر</small>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            خروج
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;