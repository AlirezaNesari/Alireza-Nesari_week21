import styles from "./Auth.module.css";

export default function AuthForm({
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  rootError,
  children,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}

      {rootError && <p className={styles.error}>{rootError}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}