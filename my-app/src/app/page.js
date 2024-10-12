import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./navbar/navbar";
import HomeComponent from "./components/main/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar/>
      <HomeComponent/>
    </div>
  );
}
