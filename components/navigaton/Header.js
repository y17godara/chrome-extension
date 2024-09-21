import styles from "./Header.module.css";
import { useGlobalState } from "../../pages/index";

export default function Header() {
  const { satus } = useGlobalState();
  return (
    <header className={styles.header}>
      for Content Creators{" "}
      {satus.settings.showVersion && (
        <span className={styles.version}>v1.0.0</span>
      )}
    </header>
  );
}
