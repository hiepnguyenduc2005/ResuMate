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

export default function Home() {
  const [processed, setProcessed] = useState(false);
  const [jobMeta, setJobMeta] = useState({'jobTitle': '', 'jobType': ''});
  const [studentMeta, setStudentMeta] = useState({'gradYear': '', 'major': '', 'race': '', 'gender': '', 
    'sponsor': ''});
  const [jobDes, setJobDes] = useState('');
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [chatbot, setChatbot] = useState('');


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
            <Process handleProcessed={setProcessed}/>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
