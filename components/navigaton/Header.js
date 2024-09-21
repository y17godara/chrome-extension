import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      Chrome Extension Starter by
      <a href="https://github.com/y17godara" target="_blank">
        y17godara
      </a>
    </header>
  );
}
