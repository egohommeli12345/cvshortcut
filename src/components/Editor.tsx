"use client";

import styles from "./Editor.module.css";
import {
  EducationInterface,
  ExperienceInterface,
  ResumeDataInterface, SkillInterface,
  useResumeContext
} from "@/components/ResumeContext";
import {ChangeEvent, useEffect, useState} from "react";

const Editor = () => {
  const {resumeData, updateField} = useResumeContext();
  const [experience, setExperience] = useState<ExperienceInterface[]>([]);
  const [experienceli, setExperienceli] = useState<string[]>([]);
  const [education, setEducation] = useState<EducationInterface[]>([]);
  const [skill, setSkill] = useState<SkillInterface[]>([]);
  const [bulletpointinput, setBulletpointinput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    updateField(name as keyof ResumeDataInterface, value);
  };

  const handleListChange = (e: ChangeEvent<HTMLInputElement>) => {

  };

  const addListItem = () => {
    setExperienceli([...experienceli, bulletpointinput]);
    setBulletpointinput("");
  };

  useEffect(() => {
    console.log(experienceli);
  }, [experienceli]);

  return (
    <>
      <div className={styles.editor}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name</label>
          <input className={styles.input} id={"name"} type="text"
                 value={resumeData.name}
                 name={"name"}
                 onChange={handleChange}/>

          <label htmlFor="title">Title</label>
          <input className={styles.input} id={"title"} type="text"
                 value={resumeData.title}
                 name={"title"}
                 onChange={handleChange}/>

          <label htmlFor="address">Address</label>
          <input className={styles.input} id={"address"} type="text"
                 name={"address"} onChange={handleChange}
                 value={resumeData.address}/>

          <label htmlFor="phone">Phone</label>
          <input className={styles.input} id={"phone"} type="text"
                 name={"phone"} onChange={handleChange}
                 value={resumeData.phone}/>

          <label htmlFor="email">E-mail</label>
          <input className={styles.input} id={"email"} type="text"
                 name={"email"} onChange={handleChange}
                 value={resumeData.email}/>

          <label htmlFor="summary">Summary</label>
          <textarea className={styles.textarea} name="summary" id="summary"
                    rows={10} onChange={handleChange}></textarea>
        </div>

        <div className={styles.inputContainer}>
          <h4>Experience</h4>

          <div className={styles.twocolgrid}>
            <label htmlFor="from">From</label>
            <input className={styles.input} id={"from"} type="text"/>

            <label htmlFor="to">To</label>
            <input className={styles.input} id={"to"} type="text"/>
          </div>

          <label htmlFor="jobtitle">Job title</label>
          <input className={styles.input} id={"jobtitle"} type="text"/>

          <label htmlFor="workplacename">Company name</label>
          <input className={styles.input} id={"workplacename"} type="text"/>

          <label htmlFor="listitem">Bullet point</label>
          <div className={styles.inputContainerWithBtn}>
            <input className={styles.input} type="text" value={bulletpointinput}
                   onChange={(e) => setBulletpointinput(e.target.value)}/>
            <button onClick={addListItem} className={styles.btn}>Add</button>
          </div>
          {
            experienceli.length > 0 &&
            <div className={styles.addingtolist}>
              {experienceli.map((li, index) =>
                <p key={index}>{li}</p>
              )}
            </div>
          }
          <button className={styles.btn} onClick={addListItem}>Add experience
          </button>

        </div>

        <div className={styles.inputContainer}>
          <p>Education</p>
          <p>Skills</p>
          <p>Projects</p>
          <p>Certifications and licences</p>
          <p>Affiliations</p>
          <p>Other (input both title and desc)</p>
        </div>
      </div>
    </>
  );
};

export default Editor;