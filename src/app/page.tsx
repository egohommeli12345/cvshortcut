"use client";

import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";
import PaymentElement from "@/components/PaymentElement";
import {useRef} from "react";


export default function Home() {
  const centerref = useRef<HTMLDivElement>(null);

  const scrollToCenter = () => {
    if (centerref) {
      centerref.current!.scrollIntoView({behavior: "smooth"});
    }
  };

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
          <p>Our resume builder simplifies the process of creating a
            standout resume. With a professional, pre-designed template, the app
            automatically formats your text into the correct sections, ensuring
            a clean and polished resume.</p>
          <button className={styles.startbtn} onClick={scrollToCenter}>
            Make my resume now
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.box}>
          <h2>Easy to use</h2>
          <div>
            {/*<img src="thumb.svg" alt="thumb"/>*/}
            <p>Streamlined for simplicity. Start with basic info, fill in key
              details, and let the app do the rest.</p>
          </div>
        </div>
        <div className={styles.box}>
          <h2>Recruiter-Friendly Template</h2>
          <div>
            {/*<img src="doc.svg" alt="document"/>*/}
            <p>Our professional resume template highlights key
              information, making it easy for recruiters to quickly find what
              matters most.</p>
          </div>
        </div>
        <div className={styles.box}>
          <h2>Instant Preview</h2>
          <div>
            {/*<img src="eye.svg" alt="eye"/>*/}
            <p>See real-time updates as you build your resume—no guessing, no
              waiting.</p>
          </div>
        </div>
      </div>

      <div className={styles.center} ref={centerref}>
        <ResumeProvider>
          <div className={styles.editor}>
            <Editor/>
            <PaymentElement/>
          </div>
          <div className={styles.preview}>
            <Preview/>
          </div>
        </ResumeProvider>
      </div>

      {/*<div className={styles.footer}>
        <div className={styles.appfrom}>
          <p><strong>CVShortcut</strong> by Samuli Pirnes</p>
          <a href="https://samulipirnes.com/" target={"_blank"}
             rel={"noopener"}>samulipirnes.com</a>
        </div>
      </div>*/}
    </main>
  );
}
