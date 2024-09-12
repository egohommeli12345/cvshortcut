import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.col1}>
          <h1>Making a good Resume doesn&apos;t have to be hard.</h1>
        </div>
        <div className={styles.col2}>

        </div>
      </div>
      <div className={styles.center}>
        <ResumeProvider>
          <Editor/>
          <Preview/>
        </ResumeProvider>
      </div>
    </main>
  );
}
