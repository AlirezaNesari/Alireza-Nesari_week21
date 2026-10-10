import styles from "./Auth.module.css";

export default function AuthField({ error, ...inputProps }) {
  return (
    <>
      <input {...inputProps} />

      {error && <p className={styles.error}>{error.message}</p>}
    </>
  );
}