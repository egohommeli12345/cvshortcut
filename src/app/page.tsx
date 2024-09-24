"use client";

import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";
import PaymentElement from "@/components/PaymentElement";


export default function Home() {


  return (
    <main className={styles.main}>
      <p className={styles.appversion}>App version: v.0.2</p>

      <div className={styles.hero}>

        <div className={styles.col2}>
          <img src="resumeExample.png" alt="Example image of the resume"/>
        </div>

        <div className={styles.col1}>
          <h1 className={styles.heading}>Create a professional <span
            className={styles.standout}>Resume</span> in minutes
          </h1>
          {/*<p>Designed for simplicity and speed, our tool guides you
            through each step, ensuring you craft a standout resume with minimal
            effort. Perfect for job seekers looking to make a strong impression
            quickly.</p>*/}
          <p>Our resume builder app simplifies the process of creating a
            standout resume. With a professional, pre-designed template, the app
            automatically formats your text into the correct sections, ensuring
            a clean and polished resume.</p>
        </div>

      </div>

      <div className={styles.center}>
        <ResumeProvider>
          <div className={styles.centersub}>
            <Editor/>
            <PaymentElement/>
          </div>
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
