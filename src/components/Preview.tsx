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

  const scale = (windowWidth: number) => {
    if (ref && widthref && previewref) {
      console.log("inside if");
      const maxWidth = previewref.current!.offsetWidth;
      const maxHeight = previewref.current!.offsetHeight;
      let scalingFactor = (maxWidth / widthref.current!.offsetWidth);

      if (windowWidth > 1000) {
        if (scalingFactor > 1) {
          scalingFactor = 1;
        }
        ref.current!.style.scale = scalingFactor.toString();
        previewref.current!.style.width = `${(ref.current!.offsetWidth).toString()}px`;
      } else if (windowWidth < 1000) {
        if (scalingFactor > 1) {
          scalingFactor = 1;
        }
        scalingFactor = scalingFactor * 0.95;
        ref.current!.style.scale = scalingFactor.toString();
        previewref.current!.style.width = `${(windowWidth).toString()}px`;
        previewref.current!.style.marginBottom = `${((ref.current!.offsetHeight * scalingFactor * 0.05) / 2).toString()}px`;
      }

      previewref.current!.style.height = `${(ref.current!.offsetHeight * scalingFactor).toString()}px`;
    }
  };

  /*useEffect(() => {
    scale();
  }, [windowWidth]);*/

  /*const resize = () => {
    setWindowWidth(window.innerWidth);
    scale();
  };*/

  useLayoutEffect(() => {
    console.log(window.innerWidth);
    // scale(window.innerWidth);
    if (ref && widthref && previewref) {

      // on initial render 0 values are: previewref -> scalingFactor

      const maxWidth = previewref.current!.offsetWidth;
      const maxHeight = previewref.current!.offsetHeight;
      let scalingFactor = (maxWidth / widthref.current!.offsetWidth);
      console.log(maxWidth, " ", scalingFactor, " ", widthref.current!.offsetWidth);

      if (window.innerWidth > 1000) {
        if (scalingFactor > 1) {
          scalingFactor = 1;
        }
        ref.current!.style.scale = scalingFactor.toString();
        previewref.current!.style.width = `${(ref.current!.offsetWidth).toString()}px`;
      } else if (window.innerWidth < 1000) {
        if (scalingFactor > 1) {
          scalingFactor = 1;
        }
        scalingFactor = scalingFactor * 0.95;
        ref.current!.style.scale = scalingFactor.toString();
        previewref.current!.style.width = `${(window.innerWidth).toString()}px`;
        previewref.current!.style.marginBottom = `${((ref.current!.offsetHeight * scalingFactor * 0.05) / 2).toString()}px`;
      }

      previewref.current!.style.height = `${(ref.current!.offsetHeight * scalingFactor).toString()}px`;
    }
  }, []);

  /*useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);*/

  /*useEffect(() => {
    console.log(resumeData);
    sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);*/

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

            {(resumeData.address?.length > 0 || resumeData.phone?.length > 0 || resumeData.email?.length > 0) &&
              <div className={styles.section}>
                <div className={styles.address}>
                  {resumeData.address?.length > 0 &&
                    <p><strong>Address: </strong>{resumeData.address}</p>}
                  {resumeData.phone?.length > 0 &&
                    <p><strong>Phone: </strong>{resumeData.phone}</p>}
                  {resumeData.email?.length > 0 &&
                    <p><strong>E-mail: </strong>{resumeData.email}</p>}
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

          </div>
          {/*<button onClick={pagebreak}>Button</button>*/}
        </div>
      </div>
    </>
  );
};

export default Preview;