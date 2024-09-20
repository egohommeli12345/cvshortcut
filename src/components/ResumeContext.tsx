"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {
  decodeFromBase64,
  encodeToBase64
} from "next/dist/build/webpack/loaders/utils";

export interface ResumeDataInterface {
  name: string,
  title: string,
  address: string,
  phone: string,
  email: string,
  linkedin: string
  summary: string,
  experience: ExperienceInterface[],
  education: EducationInterface[],
  skills: SkillInterface[],
  customentry: CustomEntryInterface[]
}

export interface ExperienceInterface {
  from: string,
  to: string,
  worktitle: string,
  workplacename: string,
  listitem: string[]
}

export interface EducationInterface {
  from: string,
  to: string,
  schoolname: string,
  listitem: string[]
}

export interface SkillInterface {
  title: string,
  text: string
}

export interface CustomEntryInterface {
  heading: string,
  title: string,
  listitem: string[]
}

interface ResumeContextType {
  resumeData: ResumeDataInterface;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDataInterface>>;
  updateField: <K extends keyof ResumeDataInterface>(key: K, value: ResumeDataInterface[K]) => void;
  resetResumeData: () => void;
  saveResumeData: () => void;
  loadResumeData: (data: FileList) => void;
}

// Create the context with default values
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Create a provider component
interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({children}: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<ResumeDataInterface>({
    address: "",
    customentry: [],
    education: [],
    email: "",
    experience: [],
    linkedin: "",
    name: "",
    phone: "",
    skills: [],
    summary: "",
    title: ""
  });

  const updateField = <K extends keyof ResumeDataInterface>(key: K, value: ResumeDataInterface[K]) => {
    setResumeData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const resetResumeData = () => {
    setResumeData({
      address: "",
      customentry: [],
      education: [],
      email: "",
      experience: [],
      linkedin: "",
      name: "",
      phone: "",
      skills: [],
      summary: "",
      title: ""
    });
    localStorage.removeItem("resumeData");
  };

  const saveResumeData = () => {
    const a = document.createElement("a");
    const data = encodeToBase64(JSON.stringify(resumeData));
    const file = new Blob([data], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "resumeData.txt";
    a.click();
    a.remove();
  };

  const loadResumeData = (data: FileList) => {
    const fr = new FileReader();
    fr.onloadend = (e) => {
      if (e.target) {
        if (e.target.result && typeof e.target.result === "string") {
          console.log(decodeFromBase64(e.target.result));
          setResumeData(JSON.parse(decodeFromBase64(e.target.result)));
        }
      }
    };
    fr.readAsText(data[0]);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateField,
        resetResumeData,
        saveResumeData,
        loadResumeData
      }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Create a custom hook to use the context
export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};