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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.h1}>ResuMate</h1>
        <div className={styles.row}>
          <JobMeta />
          <StudentMeta />
        </div>
        <div className={styles.row}>
          <JobDes />
          <Resume />
        </div>
        {processed ? (
        <div className={styles.row}>
          <Feedback />
          <Chatbot />
        </div>
        ) : (
          <div className={styles.row0}>
            <Process handleProcessed={setProcessed}/>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
