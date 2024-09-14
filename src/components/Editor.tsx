"use client";

import styles from "./Editor.module.css";
import {
  EducationInterface,
  ExperienceInterface,
  ResumeDataInterface, SkillInterface,
  useResumeContext
} from "@/components/ResumeContext";
import {ChangeEvent, useRef, useState, useCallback} from "react";
import {loadStripe} from "@stripe/stripe-js";
import Checkout from "@/components/Checkout";
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!);


const Editor = () => {
  const {resumeData, setResumeData, updateField} = useResumeContext();
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
  const [bulletpointinput, setBulletpointinput] = useState<string>("");
  const bpExpref = useRef<HTMLInputElement>(null);
  const bpEduref = useRef<HTMLInputElement>(null);
  const bpSkillref = useRef<HTMLInputElement>(null);

  // For Stripe
  const [clientSecret, setClientSecret] = useState<string>("");

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch("/api/payment_intents", {
      method: "POST",
    });
    const data = await res.json();
    setClientSecret(data.client_secret);
  }, []);

  const initPayment = async () => {
    await fetchClientSecret();
  };

  const options = {
    clientSecret: clientSecret,
    appearance: {},
    // paymentMethods:
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const downloadPdf = async () => {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(resumeData)
    });
    if (response.ok) {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);

      a.click();
    }
  };

  const saveResumeData = () => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(resumeData)], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "eaCV_resume_save.txt";
    a.click();
  };

  return (
    <>
      <div className={styles.editor}>
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
          {
            (tempexperience.listitem) &&
            <div className={styles.addingtolist}>
              {tempexperience.listitem.map((li, index) =>
                <p key={index}>{li}</p>
              )}
            </div>
          }
          <button className={styles.addbtn} onClick={addExperience}>Add
            experience
          </button>

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
          {
            (tempeducation.listitem) &&
            <div className={styles.addingtolist}>
              {tempeducation.listitem.map((li, index) =>
                <p key={index}>{li}</p>
              )}
            </div>
          }
          <button className={styles.addbtn} onClick={addEducation}>Add education
          </button>

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
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.twocolgrid}>
            {/*<button className={styles.redbtn}
                    onClick={() => setResumeData({})}>Empty
              template
            </button>
            <button className={styles.btn} onClick={saveResumeData}>Save
              editor data locally
            </button>*/}
          </div>
          <button className={styles.greenbtn} onClick={initPayment}>Download
            PDF for 2.29 €
          </button>
          {stripePromise && clientSecret &&
            <Elements
              stripe={stripePromise}
              options={options}
            >
              <Checkout/>
            </Elements>}

        </div>

      </div>
    </>
  );
};

export default Editor;