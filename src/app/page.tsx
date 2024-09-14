import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";


export default function Home() {


  return (
    <main className={styles.main}>
      <p className={styles.appversion}>App version: v.0.1</p>
      <div className={styles.hero}>
        <div className={styles.col1}>
          <h1>Making a professional<h1
            className={styles.standout}>Resume</h1> doesn&apos;t have to be
            hard.
          </h1>
          <p>Create a professional resume in minutes with our intuitive resume
            generator. Designed for simplicity and speed, our tool guides you
            through each step, ensuring you craft a standout resume with minimal
            effort. Perfect for job seekers looking to make a strong impression
            quickly.</p>
        </div>
        <div className={styles.col2}>
          <div className={styles.box}>

          </div>
          <div className={styles.box}>

          </div>
        </div>
      </div>
      <div className={styles.center}>

        <ResumeProvider>
          <Editor/>
          <Preview/>
        </ResumeProvider>
      </div>
      <div className={styles.footer}>
        <div className={styles.appfrom}>
          <p><strong>CVShortcut</strong> by Samuli Pirnes</p>
          <a href="https://samulipirnes.com/" target={"_blank"}
             rel={"noopener"}>samulipirnes.com</a>
        </div>
      </div>
    </main>
  );
}
