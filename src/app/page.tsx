import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";

export default function Home() {
  return (
    <main className={styles.main}>
      {/*<Test></Test>*/}
      <div className={styles.center}>
        <ResumeProvider>
          <Editor/>
          <Preview/>
        </ResumeProvider>
      </div>
    </main>
  );
}
