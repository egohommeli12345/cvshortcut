"use client";

import styles from "./Preview.module.css";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useResumeContext} from "@/components/ResumeContext";

const Preview = () => {
  const {resumeData} = useResumeContext();
  const ref = useRef<HTMLDivElement>(null);
  const previewref = useRef<HTMLDivElement>(null);
  const widthref = useRef<HTMLDivElement>(null);
  const pagebreakref = useRef<HTMLDivElement>(null);
  // const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  const scale = () => {
    if (ref && widthref && previewref) {
      let maxWidth = previewref.current!.offsetWidth;
      console.log(previewref.current!.offsetWidth);
      // if (maxWidth >= widthref.current!.offsetWidth) maxWidth = widthref.current!.offsetWidth;
      let scalingFactor = (maxWidth / widthref.current!.offsetWidth);
      console.log(scalingFactor);

      if (window.innerWidth > 1000) {
        ref.current!.style.scale = scalingFactor.toString();
        // previewref.current!.style.width = `${(ref.current!.offsetWidth).toString()}px`;
      } else if (window.innerWidth < 1000) {
        ref.current!.style.scale = scalingFactor.toString();
        // previewref.current!.style.width = `${(ref.current!.offsetWidth).toString()}px`;
        previewref.current!.style.marginBottom = `${((ref.current!.offsetHeight * scalingFactor * 0.05) / 2).toString()}px`;
      }

      ref.current!.style.display = "block";

      previewref.current!.style.height = `${(ref.current!.offsetHeight * scalingFactor).toString()}px`;

    }
  };

  useEffect(() => {
    const element = ref.current;

    setTimeout(() => {
      scale();
    }, 0);
    window.addEventListener("resize", scale);

    if (element) {
      // Create a ResizeObserver to listen to height changes
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect) {
            scale();
          }
        }
      });

      resizeObserver.observe(element); // Start observing the element

      return () => {
        window.removeEventListener("resize", scale);
        resizeObserver.unobserve(element);
      };
    }

    return () => window.removeEventListener("resize", scale);
  }, []);

  return (
    <>
      <div className={styles.reference} ref={widthref}></div>
      <div className={styles.preview} ref={previewref}>
        <div className={styles.content} ref={ref}>
          <div ref={pagebreakref} className={styles.contentstart}>


            {(resumeData.name?.length > 0 || resumeData.title?.length > 0) &&
              <div className={styles.section}>
                <h2 className={styles.name}>{resumeData.name}</h2>
                <p className={styles.title}>{resumeData.title}</p>
              </div>}

            {(resumeData.address?.length > 0 || resumeData.phone?.length > 0 || resumeData.email?.length > 0 || resumeData.linkedin?.length > 0) &&
              <div className={styles.section}>
                <div className={styles.address}>
                  {resumeData.address?.length > 0 &&
                    <p><strong>Address: </strong>{resumeData.address}</p>}
                  {resumeData.phone?.length > 0 &&
                    <p><strong>Phone: </strong>{resumeData.phone}</p>}
                  {resumeData.email?.length > 0 &&
                    <p><strong>E-mail: </strong>{resumeData.email}</p>}
                  {resumeData.linkedin?.length > 0 &&
                    <p><strong>Linkedin: </strong>{resumeData.linkedin}</p>}
                </div>
              </div>}

            {resumeData.summary?.length > 0 &&
              <div className={styles.section}>
                <div className={styles.summary}>
                  <p>{resumeData.summary}</p>
                </div>
              </div>}

            {resumeData.experience?.length > 0 &&
              <div className={styles.section}>
                <div className={styles.experience}>
                  <h3>Experience</h3>

                  <div className={styles.entries}>
                    {resumeData.experience.map((exp, index) =>
                      <div className={styles.entry} key={index}>
                        <p className={styles.fromto} onClick={() => {
                          console.log(index);
                        }}>{exp.from} - {exp.to}</p>
                        <div className={styles.gapeight}>
                          <div>
                            <h4>{exp.worktitle}</h4>
                            <i>{exp.workplacename}</i>
                          </div>
                          <ul>
                            {exp.listitem.map((item, index) =>
                              <li key={index}>{item}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>}

            {resumeData.education?.length > 0 &&
              <div className={styles.section}>
                <div className={styles.education}>
                  <h3>Education</h3>

                  <div className={styles.entries}>

                    {resumeData.education.map((edu, index) =>
                      <div className={styles.entry} key={index}>
                        <p className={styles.fromto}>{edu.from} - {edu.to}</p>
                        <div className={styles.gapeight}>
                          <div>
                            <h4>{edu.schoolname}</h4>
                          </div>
                          <ul>
                            {edu.listitem.map((item, index) =>
                              <li key={index}>{item}</li>
                            )}
                          </ul>
                        </div>
                      </div>)}

                  </div>

                </div>
              </div>}

            {resumeData.skills?.length > 0 &&
              <div className={styles.section}>
                <div className={styles.skills}>
                  <h3>Skills</h3>
                  <div className={styles.entries}>

                    {resumeData.skills.map((skill, index) =>
                      <div className={styles.entry} key={index}>
                        <div></div>
                        <p><strong>{skill.title}</strong> - {skill.text}</p>
                      </div>)}

                  </div>
                </div>
              </div>}

            {resumeData.customsection?.length > 0 &&
              resumeData.customsection.map((cs, index) =>
                <div className={styles.section} key={index}>
                  <div className={styles.skills}>
                    <h3>{cs.name}</h3>
                    <div className={styles.entries}>

                      {cs.listitem.map((li, index) =>
                        <div className={styles.entry} key={index}>
                          <div></div>
                          <p>{li}</p>
                        </div>)}

                    </div>
                  </div>
                </div>)}

          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;