"use client"

import Image from "next/image";
import styles from "./page.module.css";
import JobMeta from "../components/job_meta.js";
import StudentMeta from "../components/student_meta.js";
import JobDes from "../components/job_des.js";
import Resume from "../components/resume.js";
import Feedback from "../components/feedback.js";
import Chatbot from "../components/chatbot.js";
import Process from "../components/process.js";
import React from "react";
import { useState } from "react";
import jobCrit from "../mock_db/job_title.json"

export default function Home() {
  const [processed, setProcessed] = useState(false);
  const [jobMeta, setJobMeta] = useState({'jobTitle': '', 'jobType': ''});
  const [studentMeta, setStudentMeta] = useState({'gradYear': '', 'major': '', 'race': '', 'gender': '', 
    'sponsor': ''});
  const [jobDes, setJobDes] = useState('');
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [chatbot, setChatbot] = useState('');

  const generate = async () => {
    try {
  
      let user_data = "Here is the biographical information of the user " + JSON.stringify(studentMeta);
      let job_data = "Here is the job information " + JSON.stringify(jobMeta) + "\n and " + jobDes;
      let job_criteria = "Here is the job criteria: " + jobCrit[jobMeta.jobType ? jobMeta.jobType : "swe"]
      let resume_data = "Resume data: " + resume.name;
    
      const myPrompt = `${user_data}\n${job_data}\n${job_criteria}\n${resume_data}`;
  
      console.log(jobMeta.jobType)
      console.log(jobCrit)
      console.log("Generated Prompt:", myPrompt);
  
      const response = await fetch("api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: myPrompt,
      });
  
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      
      const data = await response.json(); 
      setFeedback(data); 
  
    } catch (error) {
      
      console.error("Error during API call:", error.message);
    }
  };
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.h1}>ResuMate</h1>
        <div className={styles.row}>
          <JobMeta jobMeta={jobMeta} setJobMeta={setJobMeta} />
          <StudentMeta studentMeta={studentMeta} setStudentMeta={setStudentMeta} />
        </div>
        <div className={styles.row}>
          <JobDes jobDes={jobDes} setJobDes={setJobDes} />
          <Resume resume={resume} setResume={setResume} setProcessed={setProcessed}/>
        </div>
        {processed ? (
        <div className={styles.row}>
          <Feedback feedback={feedback} setFeedback={setFeedback}/>
          <Chatbot chatbot={chatbot} setChatbot={setChatbot} />
        </div>
        ) : (
          <div className={styles.row0}>
            <Process handleProcessed={setProcessed} generate={generate}/>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
