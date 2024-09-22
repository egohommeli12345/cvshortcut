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
            a clean and polished resume. Build a customized resume that
            highlights your skills and experience effortlessly, helping you
            present yourself professionally to employers.</p>
        </div>
        <div className={styles.col2}>
          <img src="resumeExample.png" alt="Example image of the resume"/>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.text}>
          <div className={styles.textInside}>
            <h1>How to make a good resume?</h1>
          </div>
          <p>A good resume is concise, tailored, and professional. Its purpose
            is to quickly communicate your skills, experience, and
            qualifications to potential employers.</p>
          <h3>Tailor Your Resume for Each Job</h3>
          <p>Customizing your resume for each job application is vital. Use
            specific keywords from the job description and highlight relevant
            experience that matches the role. Show clear career progression by
            emphasizing achievements and results. This helps recruiters quickly
            see how your skills and experience align with their needs.</p>
          <h3>Design and Layout</h3>
          <p>For resume design, stick to a clean, simple and professional
            layout.
            Avoid clutter and ensure consistent
            spacing and formatting. A well-organized resume is easier for
            recruiters to read and makes a strong impression.</p>
          <h3>Proofread and Polish</h3>
          <p>Before submitting your resume, thoroughly proofread to eliminate
            any typos or grammatical errors. Use consistent verb tenses—past
            tense for previous jobs and present tense for your current role.
            This attention to detail shows professionalism.</p>
        </div>
        <div className={styles.text}>
          <div className={styles.textInside}>
            <h2>Start Filling In Your Information Below!</h2>
          </div>
        </div>
      </div>

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
