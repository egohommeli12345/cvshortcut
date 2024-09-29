import styles from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <div className={styles.navbg}>
        <div className={styles.navbar}>
          <Link href={"/"} className={styles.logo}>
            {/*CVShortcut*/}
            <img src="/logo.svg" alt="CVShortcut"/>
          </Link>
          <div className={styles.links}>
            <Link href={"/articles"} className={styles.link}>Guide
              articles</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;