"use client";

import styles from "./page.module.css";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import {ResumeProvider} from "@/components/ResumeContext";
import Image from "next/image";
import PaymentElement from "@/components/PaymentElement";


export default function Home() {


  return (
    <main className={styles.main}>
      <p className={styles.appversion}>App version: v.0.1</p>
      <div className={styles.hero}>
        <div className={styles.col1}>
          <h1 className={styles.heading}>Create a professional <span
            className={styles.standout}>Resume</span> in minutes
          </h1>
          <p>Designed for simplicity and speed, our tool guides you
            through each step, ensuring you craft a standout resume with minimal
            effort. Perfect for job seekers looking to make a strong impression
            quickly.</p>
        </div>
        <div className={styles.col2}>
          <img src="resumeExample.png" alt="Example image of the resume"/>
          {/*<div className={styles.box}>
            <h3>Our CV builder</h3>
            <div className={styles.list}>
              <p><Image src="check-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Fast
              </p>
              <p><Image src="check-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Easy to use</p>
              <p><Image src="check-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Professional layout</p>
              <p><Image src="check-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>You focus only on the content</p>
              <p><Image src="check-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Mobile friendly*</p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Making CV manually</h3>
            <div className={styles.list}>
              <p><Image src="xmark-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Slow</p>
              <p><Image src="xmark-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Difficult, too many options</p>
              <p><Image src="xmark-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Manual layout</p>
              <p><Image src="xmark-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Can&apos;t focus only on the content</p>
              <p><Image src="xmark-svgrepo-com.svg" alt="check" width={32}
                        height={32}/>Nearly impossible to do on mobile</p>
            </div>
          </div>*/}
        </div>
      </div>

      {/*<div className={styles.example}>
        <img src="resumeExample.png" alt="Example image of the resume"/>
      </div>*/}

      <div className={styles.center}>
        <ResumeProvider>
          <div className={styles.centersub}>
            <Editor/>
            <Preview/>
          </div>
          <PaymentElement/>
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
