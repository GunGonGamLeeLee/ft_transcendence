import styles from './Login.module.css';

export function LoginButton() {
  return (
    <>
      <a
        href={`${import.meta.env.VITE_BACKEND_EP}/login/oauth`}
        className={styles.login__button}
      >
        LOGIN
      </a>
    </>
  );
}
