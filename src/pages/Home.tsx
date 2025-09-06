import { Link } from "react-router-dom";
import styles from "../components/App/App.module.css";

export default function Home() {
  return (
    <section>
      <h1 className={styles.sectionTitle}>MovieFinder</h1>
      <p className={styles.helper}>
        A tiny app to explore TMDB: search by title, browse popular picks, open details.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Link to="/movies" className={styles.btn}>Go to Movies</Link>
        <a
          href="https://www.themoviedb.org/"
          target="_blank" rel="noreferrer"
          className={`${styles.btn} ${styles.btnGhost}`}
        >
          Powered by TMDB
        </a>
      </div>
    </section>
  );
}
