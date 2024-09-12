"use client";

import styles from "./Preview.module.css";
import {useEffect, useRef, useState} from "react";
import {useResumeContext} from "@/components/ResumeContext";

const Preview = () => {
  const {resumeData} = useResumeContext();
  const ref = useRef<HTMLDivElement>(null);
  const previewref = useRef<HTMLDivElement>(null);
  const widthref = useRef<HTMLDivElement>(null);
  const pagebreakref = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const scale = () => {
    if (ref && widthref && previewref) {
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
      }

      previewref.current!.style.height = `${(ref.current!.offsetHeight * scalingFactor).toString()}px`;
    }
  };

  useEffect(() => {
    scale();
  }, [windowWidth]);

  const resize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const pagebreak = () => {
    if (ref.current!.offsetHeight > (widthref.current!.offsetWidth * (297 / 210))) {
      console.log("Over A4");
    }
    console.log(ref.current!.innerHTML);
  };

  useEffect(() => {
    console.log(resumeData);
  }, [resumeData]);

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
                        <p>{exp.from} - {exp.to}</p>
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

                    <div className={styles.entry}>
                      <p>2024 - present</p>
                      <div className={styles.gapeight}>
                        <div>
                          <h4>Work title</h4>
                          <i>Where worked</i>
                        </div>
                        <ul>
                          <li>Lorem ipsum odor amet, consectetuer adipiscing
                            elit.
                          </li>
                          <li>Proin eu tellus purus fusce eros egestas nulla.
                          </li>
                          <li>Urna vestibulum nisl ipsum torquent commodo hac
                            sed
                            consectetur.
                          </li>
                          <li>Porta mauris nec nisi et quam ullamcorper.</li>
                        </ul>
                      </div>
                    </div>

                  </div>

                </div>
              </div>}

            <div className={styles.section}>
              <div className={styles.education}>
                <h3>Education</h3>

                <div className={styles.entries}>

                  <div className={styles.entry}>
                    <p>2020-12 - 2024-12</p>
                    <div className={styles.gapeight}>
                      <div>
                        <h4>Where went to school</h4>
                      </div>
                      <ul>
                        <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                        </li>
                        <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                      </ul>
                    </div>
                  </div>

                  <div className={styles.entry}>
                    <p>2020-12 - 2024-12</p>
                    <div className={styles.gapeight}>
                      <div>
                        <h4>Where went to school</h4>
                      </div>
                      <ul>
                        <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                        </li>
                        <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                        <li>Porta mauris nec nisi et quam ullamcorper.</li>
                      </ul>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.skills}>
                <h3>Skills</h3>
                <div className={styles.entries}>
                  <div className={styles.entry}>
                    <div></div>
                    <p><strong>Skill title here</strong> - Additional
                      information of
                      the skill</p>
                  </div>
                  <div className={styles.entry}>
                    <div></div>
                    <p><strong>Skill title here</strong> - Urna vestibulum nisl
                      ipsum torquent commodo hac sed consectetur.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <button onClick={pagebreak}>Button</button>
        </div>
      </div>
    </>
  );
};

export default Preview;