import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p
        className={styles.footerText}
      >
        Github Repository:{" "}
        <a
          href="https://github.com/y17godara/next-chrome-extension-starter"
          target="_blank"
          className={styles.footerLink}
        >
          @y17godara
          <img src="icons/icon16.png" alt="Logo" width={16} height={16} />
        </a>
      </p>
    </footer>
  );
}
