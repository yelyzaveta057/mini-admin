import { Routes, Route, NavLink } from "react-router-dom";
import styles from "./App.module.css";
import Home from "../../pages/Home";
import Movies from "../../pages/Movies";

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>🎬 MovieFinder</NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
    </div>
  );
}
