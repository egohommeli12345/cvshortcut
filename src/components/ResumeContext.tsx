"use client";

import {createContext, ReactNode, useContext, useState} from "react";

export interface ResumeDataInterface {
  name: string,
  title: string,
  address: string,
  phone: string,
  email: string,
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
  listitem: string[]
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
}

// Create the context with default values
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Create a provider component
interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({children}: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<ResumeDataInterface>({});

  const updateField = <K extends keyof ResumeDataInterface>(key: K, value: ResumeDataInterface[K]) => {
    setResumeData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <ResumeContext.Provider value={{resumeData, setResumeData, updateField}}>
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