import styles from "./PaymentElement.module.css";
import { useEffect, useState } from "react";
import { useResumeContext } from "@/components/ResumeContext";

export const DownloadPdf = () => {
  const {
    resumeData,
    setResumeData,
    updateField,
    resetResumeData,
    saveResumeData,
    loadResumeData,
  } = useResumeContext();

  const [pdf, setPdf] = useState<string>("");

  const buttonTexts = {
    default: "Download PDF",
    afterClick: "Downloading...",
    success: "Success, opening",
    error: "Error downloading",
  };

  const [buttonText, setButtonText] = useState<string>(buttonTexts.default);

  const download = async () => {
    setButtonText(buttonTexts.afterClick);
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    const savedResumeData = JSON.parse(
      localStorage.getItem("resumeData") || "{}",
    );
    const savedEmail = localStorage.getItem("email") || "";
    setResumeData(savedResumeData);
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: savedResumeData,
        email: savedEmail,
      }),
    });

    if (response.ok) {
      setButtonText(buttonTexts.success);
      history.replaceState(null, "", window.location.pathname);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      setPdf(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);
    } else if (response.status === 401) {
      // if (payref.current) payref.current.className = styles.payred;
      // setPayBtnText("Payment has been used");
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname);
        window.location.reload();
        // payref.current!.className = styles.pay;
        // setPayBtnText("Pay and download");
      }, 3000);
    }
    setTimeout(() => {
      setButtonText(buttonTexts.default);
    }, 3000);
  };

  useEffect(() => {
    if (localStorage.getItem("resumeData")) {
      setResumeData(JSON.parse(localStorage.getItem("resumeData") || "{}"));
    }
  }, []);
  return (
    <>
      <button className={styles.greenbtn} onClick={download}>
        {buttonText}
      </button>
    </>
  );
};

export default DownloadPdf;
