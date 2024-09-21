"use client"

import styles from "./page.module.css";
import JobMeta from "../components/job_meta.js";
import StudentMeta from "../components/student_meta.js";
import JobDes from "../components/job_des.js";
import Resume from "../components/resume.js";
import Feedback from "../components/feedback.js";
import Chatbot from "../components/chatbot.js";
import Process from "../components/process.js";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [processed, setProcessed] = useState(false);
  const [jobMeta, setJobMeta] = useState({'jobTitle': '', 'jobType': ''});
  const [studentMeta, setStudentMeta] = useState({'gradYear': '', 'major': '', 'race': '', 'gender': '', 
    'sponsor': ''});
  const [jobDes, setJobDes] = useState('');
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [chatbot, setChatbot] = useState('');

  const [pyodide, setPyodide] = useState(null);
  const [resumeText, setResumeText] = useState('');

  useEffect(() => {
    if (!window.pyodide) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js";
      script.onload = async () => {
        try {
          const loadedPyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
          });
          setPyodide(loadedPyodide);
        } catch (error) {
          console.error('Failed to load Pyodide:', error);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const writeFileToPyodideFS = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result); 
        try {
          pyodide.FS.writeFile(file.name, data); 
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file); // Read the file as an array buffer (binary data)
    });
  };

  // Run Python Code
  const runPython = async () => {
    if (pyodide) {
      try {
        // Ensure Pyodide packages are loaded
        await pyodide.loadPackage(['micropip']);
        await pyodide.runPythonAsync(`
          import micropip
          await micropip.install('PyPDF2')
        `);

        // Write the file to Pyodide's virtual FS
        if (resume) {
          await writeFileToPyodideFS(resume);

          // Process the file inside Pyodide's virtual FS
          const result = await pyodide.runPythonAsync(`
            import PyPDF2

            def extract_text_from_pdf(pdf_path):
                with open(pdf_path, "rb") as file:
                    reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text()
                return text

            pdf_path = "${resume.name}"  # Use the file path in Pyodide's virtual FS
            extract_text_from_pdf(pdf_path)
          `);

          setResumeText(result);
        } else {
          console.error("No file selected.");
        }
      } catch (error) {
        console.error('Error running Python code:', error);
      }
    } else {
      console.error('Pyodide is not loaded yet');
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
          <Resume resume={resume} setResume={setResume} setProcessed={setProcessed} pyodide={pyodide} />
        </div>
        
        {processed ? (
        <div className={styles.row}>
          <Feedback feedback={feedback} setFeedback={setFeedback}/>
          <Chatbot chatbot={chatbot} setChatbot={setChatbot} />
        </div>
        ) : (
          <div className={styles.row0}>
            <Process handleProcessed={setProcessed} runPython={runPython}/>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
