import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

export default function Home() {
  return (
    <main className={styles.main}>
      {/*<Test></Test>*/}
      <div className={styles.center}>
        <Editor/>
        <Preview/>
      </div>
    </main>
  );
}
