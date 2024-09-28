"use client";

import styles from "./Editor.module.css";
import {
  CustomSectionInterface,
  EducationInterface,
  ExperienceInterface,
  ResumeDataInterface,
  SkillInterface,
  useResumeContext
} from "@/components/ResumeContext";
import {
  ChangeEvent,
  useRef,
  useState
} from "react";
import Image from "next/image";

const Editor = () => {
  const {
    resumeData,
    setResumeData,
    updateField,
    resetResumeData,
    saveResumeData,
    loadResumeData,
  } = useResumeContext();
  const [tempexperience, setTempexperience] = useState<ExperienceInterface>({
    from: "",
    listitem: [],
    to: "",
    workplacename: "",
    worktitle: ""
  });
  const [tempeducation, setTempeducation] = useState<EducationInterface>({
    from: "",
    listitem: [],
    schoolname: "",
    to: ""
  });
  const [tempskill, setTempskill] = useState<SkillInterface>({
    text: "",
    title: ""
  });
  const [tempcustom, setTempcustom] = useState<CustomSectionInterface>({
    name: "",
    listitem: []
  });
  const [bulletpointinput, setBulletpointinput] = useState<string>("");
  const bpExpref = useRef<HTMLInputElement>(null);
  const bpEduref = useRef<HTMLInputElement>(null);
  const customTextref = useRef<HTMLInputElement>(null);

  const [txtfile, setTxtfile] = useState<FileList | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    updateField(name as keyof ResumeDataInterface, value);
  };

  const addExperienceListItem = () => {
    if (bpExpref) {
      if (tempexperience.listitem) {
        setTempexperience({
          ...tempexperience,
          listitem: [...tempexperience.listitem, bpExpref.current!.value]
        });
      } else {
        setTempexperience({
          ...tempexperience,
          listitem: [bpExpref.current!.value]
        });
      }
      bpExpref.current!.value = "";
      bpExpref.current!.focus();
    }
  };

  const addEducationListItem = () => {
    if (bpEduref) {
      if (tempeducation.listitem) {
        setTempeducation({
          ...tempeducation,
          listitem: [...tempeducation.listitem, bpEduref.current!.value]
        });
      } else {
        setTempeducation({
          ...tempeducation,
          listitem: [bpEduref.current!.value]
        });
      }
      bpEduref.current!.value = "";
    }
  };

  const addCustomListItem = () => {
    if (customTextref) {
      if (tempcustom.listitem) {
        setTempcustom({
          ...tempcustom,
          listitem: [...tempcustom.listitem, customTextref.current!.value]
        });
      } else {
        setTempcustom({
          ...tempcustom,
          listitem: [customTextref.current!.value]
        });
      }
      customTextref.current!.value = "";
    }
  };

  const addSkill = () => {
    if (resumeData.skills) {
      setResumeData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, tempskill]
      }));
    } else {
      setResumeData((prevState) => ({
        ...prevState,
        skills: [tempskill]
      }));
    }
    setTempskill({
      title: "",
      text: ""
    });
  };

  const addExperience = () => {
    if (resumeData.experience) {
      setResumeData((prevState) => ({
        ...prevState,
        experience: [...prevState.experience, tempexperience]
      }));
    } else {
      setResumeData((prevState) => ({
        ...prevState,
        experience: [tempexperience]
      }));
    }
    setTempexperience({
      from: "",
      to: "",
      worktitle: "",
      workplacename: "",
      listitem: []
    });
  };

  const addEducation = () => {
    if (resumeData.education) {
      setResumeData((prevState) => ({
        ...prevState,
        education: [...prevState.education, tempeducation]
      }));
    } else {
      setResumeData((prevState) => ({
        ...prevState,
        education: [tempeducation]
      }));
    }
    setTempeducation({
      from: "",
      to: "",
      schoolname: "",
      listitem: []
    });
  };

  const addCustomSection = () => {
    if (resumeData.customsection) {
      setResumeData((prevState) => ({
        ...prevState,
        customsection: [...prevState.customsection, tempcustom]
      }));
    } else {
      setResumeData((prevState) => ({
        ...prevState,
        customsection: [tempcustom]
      }));
    }
    setTempcustom({
      name: "",
      listitem: []
    });
  };

  const handleTempExperience = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTempexperience({
      ...tempexperience,
      [name]: value,
    });
  };

  const handleTempeducation = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTempeducation({
      ...tempeducation,
      [name]: value,
    });
  };

  const handleTempskill = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTempskill({
      ...tempskill,
      [name]: value,
    });
  };

  const handleTempCustom = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTempcustom({
      ...tempcustom,
      [name]: value,
    });
  };

  const removeEduItem = (index: number) => {
    setTempeducation(prev => {
      const updatedList = [...prev.listitem];
      updatedList.splice(index, 1);
      return {
        ...prev,
        listitem: updatedList
      };
    });
  };

  const removeExpItem = (index: number) => {
    setTempexperience(prev => {
      const updatedList = [...prev.listitem];
      updatedList.splice(index, 1);
      return {
        ...prev,
        listitem: updatedList
      };
    });
  };

  const removeCustomItem = (index: number) => {
    setTempcustom(prev => {
      const updatedList = [...prev.listitem];
      updatedList.splice(index, 1);
      return {
        ...prev,
        listitem: updatedList
      };
    });
  };

  return (
    <>
      <div className={styles.editor}>
        <div className={styles.inputContainer}>
          <h4>Resume language</h4>
          <label htmlFor="language">Language</label>
          <select name="language"
                  id="language"
                  className={styles.select}
                  onChange={handleChange}>
            <option value="en">English</option>
            <option value="fi">Finnish</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <h4>Basic info</h4>
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

          <label htmlFor="linkedin">Linkedin</label>
          <input className={styles.input} id={"linkedin"} type="text"
                 name={"linkedin"} onChange={handleChange}
                 value={resumeData.linkedin}/>

          <label htmlFor="summary">Summary</label>
          <textarea className={styles.textarea} name="summary" id="summary"
                    rows={10} onChange={handleChange}
                    value={resumeData.summary}></textarea>
        </div>

        <div className={styles.inputContainer}>
          <h4>Experience</h4>

          <div className={styles.twocolgrid}>
            <label htmlFor="from">From</label>
            <input onChange={handleTempExperience} name={"from"}
                   value={tempexperience.from}
                   className={styles.input} id={"from"} type="text"/>

            <label htmlFor="to">To</label>
            <input onChange={handleTempExperience} name={"to"}
                   value={tempexperience.to}
                   className={styles.input} id={"to"} type="text"/>
          </div>

          <label htmlFor="jobtitle">Job title</label>
          <input onChange={handleTempExperience} name={"worktitle"}
                 value={tempexperience.worktitle}
                 className={styles.input} id={"jobtitle"} type="text"/>

          <label htmlFor="workplacename">Company name</label>
          <input onChange={handleTempExperience} name={"workplacename"}
                 value={tempexperience.workplacename}
                 className={styles.input} id={"workplacename"} type="text"/>

          <label htmlFor="listitem">Bullet point</label>
          <div className={styles.inputContainerWithBtn}>
            <input className={styles.input} type="text"
                   ref={bpExpref}/>
            <button onClick={addExperienceListItem} className={styles.btn}>
              Add
            </button>
          </div>
          {tempexperience.listitem.map((li, index) =>
            <div className={styles.inputContainerWithBtn} key={index}>
              <input className={styles.input} type="text" value={li}
                     disabled={true}/>
              <button onClick={() => {
                bpExpref.current!.value = li;
                removeExpItem(index);
              }}
                      className={styles.btn}>Edit
              </button>
            </div>
          )}
          <button className={styles.addbtn} onClick={addExperience}>Add
            experience
          </button>

          {resumeData.experience.map((exp, index) => (
            <div className={styles.added} key={index}>
              {index + 1}. {exp.workplacename}
              <div className={styles.orderbtn}
                   onClick={() => {
                     setTempexperience(exp);
                     const updated = [...resumeData.experience];
                     updated.splice(index, 1);
                     setResumeData({
                       ...resumeData,
                       experience: updated
                     });
                   }}><Image src={"edit.svg"} alt={"Edit"} width={16}
                             height={16}/>
              </div>
              {index > 0 &&
                <div className={styles.orderbtn}
                     onClick={() => updateField("experience", resumeData.experience, (index - 1), index)}>
                  <Image src={"up-circle.svg"} alt={"Up"} width={16}
                         height={16}/>
                </div>}
            </div>
          ))}

        </div>

        <div className={styles.inputContainer}>
          <h4>Education</h4>

          <div className={styles.twocolgrid}>
            <label htmlFor="from">From</label>
            <input onChange={handleTempeducation} name={"from"}
                   value={tempeducation.from}
                   className={styles.input} id={"from"} type="text"/>

            <label htmlFor="to">To</label>
            <input onChange={handleTempeducation} name={"to"}
                   value={tempeducation.to}
                   className={styles.input} id={"to"} type="text"/>
          </div>

          <label htmlFor="schoolname">School name</label>
          <input onChange={handleTempeducation} name={"schoolname"}
                 value={tempeducation.schoolname}
                 className={styles.input} id={"schoolname"} type="text"/>

          <label htmlFor="listitem">Bullet point</label>
          <div className={styles.inputContainerWithBtn}>
            <input className={styles.input} type="text"
                   ref={bpEduref}/>
            <button onClick={addEducationListItem} className={styles.btn}>Add
            </button>
          </div>

          {tempeducation.listitem.map((li, index) =>
            <div className={styles.inputContainerWithBtn} key={index}>
              <input className={styles.input} type="text" value={li}
                     disabled={true}/>
              <button onClick={() => {
                bpEduref.current!.value = li;
                removeEduItem(index);
              }}
                      className={styles.btn}>Edit
              </button>
            </div>
          )}

          <button className={styles.addbtn} onClick={addEducation}>Add education
          </button>

          {resumeData.education.map((edu, index) => (
            <div className={styles.added} key={index}>
              {index + 1}. {edu.schoolname}
              <div className={styles.orderbtn}
                   onClick={() => {
                     setTempeducation(edu);
                     const updated = [...resumeData.education];
                     updated.splice(index, 1);
                     setResumeData({
                       ...resumeData,
                       education: updated
                     });
                   }}><Image src={"edit.svg"} alt={"Edit"} width={16}
                             height={16}/>
              </div>
              {index > 0 &&
                <div className={styles.orderbtn}
                     onClick={() => updateField("education", resumeData.education, (index - 1), index)}>
                  <Image src={"up-circle.svg"} alt={"Up"} width={16}
                         height={16}/>
                </div>}
            </div>
          ))}

        </div>

        <div className={styles.inputContainer}>
          <h4>Skills</h4>
          <label htmlFor="skilltitle">Skill</label>
          <input type="text" id={"skilltitle"} onChange={handleTempskill}
                 name={"title"}
                 value={tempskill.title}
                 className={styles.input}/>

          <label htmlFor="skillinfo">Brief information about the skill</label>
          <input type="text" id={"skillinfo"} onChange={handleTempskill}
                 name={"text"}
                 value={tempskill.text}
                 className={styles.input}/>

          <button className={styles.addbtn} onClick={addSkill}>Add skill
          </button>

          {resumeData.skills.map((skill, index) => (
            <div className={styles.added} key={index}>
              {index + 1}. {skill.title}
              <div className={styles.orderbtn}
                   onClick={() => {
                     setTempskill(skill);
                     const updated = [...resumeData.skills];
                     updated.splice(index, 1);
                     setResumeData({
                       ...resumeData,
                       skills: updated
                     });
                   }}><Image src={"edit.svg"} alt={"Edit"} width={16}
                             height={16}/>
              </div>
              {index > 0 &&
                <div className={styles.orderbtn}
                     onClick={() => updateField("skills", resumeData.skills, (index - 1), index)}>
                  <Image src={"up-circle.svg"} alt={"Up"} width={16}
                         height={16}/>
                </div>}
            </div>
          ))}

        </div>

        <div className={styles.inputContainer}>
          <h4>Custom sections</h4>

          <label htmlFor="sectionname">Section name</label>
          <input type="text" className={styles.input}
                 name={"name"}
                 value={tempcustom.name}
                 onChange={handleTempCustom}/>

          <label htmlFor={"customlistitem"}>Text</label>
          <div className={styles.inputContainerWithBtn}>
            <input className={styles.input} id={"customlistitem"}
                   type="text"
                   ref={customTextref}/>
            <button className={styles.btn} onClick={addCustomListItem}>Add
            </button>
          </div>

          {tempcustom.listitem.map((li, index) =>
            <div className={styles.inputContainerWithBtn} key={index}>
              <input className={styles.input} type="text" value={li}
                     disabled={true}/>
              <button onClick={() => {
                customTextref.current!.value = li;
                removeCustomItem(index);
              }}
                      className={styles.btn}>Edit
              </button>
            </div>
          )}

          <button className={styles.addbtn} onClick={addCustomSection}>Add
            section
          </button>

          {resumeData.customsection &&
            resumeData.customsection.map((cs, index) => (
              <div className={styles.added} key={index}>
                {index + 1}. {cs.name}
                <div className={styles.orderbtn}
                     onClick={() => {
                       setTempcustom(cs);
                       const updated = [...resumeData.customsection];
                       updated.splice(index, 1);
                       setResumeData({
                         ...resumeData,
                         customsection: updated
                       });
                     }}><Image src={"edit.svg"} alt={"Edit"} width={16}
                               height={16}/>
                </div>
                {index > 0 &&
                  <div className={styles.orderbtn}
                       onClick={() => updateField("customsection", resumeData.customsection, (index - 1), index)}>
                    <Image src={"up-circle.svg"} alt={"Up"} width={16}
                           height={16}/>
                  </div>}
              </div>
            ))}

        </div>

        <div className={styles.inputContainer}>
          <div className={styles.twocolgrid}>
            <button className={styles.savebtn}
                    onClick={resetResumeData}>Empty template
            </button>
            <button className={styles.savebtn} onClick={saveResumeData}>Save
              editor data locally
            </button>
          </div>
          <label htmlFor="files">Open saved file:</label>
          <input type="file" id={"files"} accept={".txt"}
                 className={styles.fileinput}
                 onChange={(e) => {
                   if (e.target.files) loadResumeData(e.target.files);
                 }}/>

        </div>

      </div>
    </>
  );
};

export default Editor;