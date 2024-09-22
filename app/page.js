"use client"

import styles from "./page.module.css";
import JobMeta from "../components/job_meta.js";
import StudentMeta from "../components/student_meta.js";
import JobDes from "../components/job_des.js";
import Resume from "../components/resume.js";
import Feedback from "../components/feedback.js";
import Chatbot from "../components/chatbot.js";
import Reset from "../components/reset.js";
import Process from "../components/process.js";
import React from "react";
import Image from 'next/image';


import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import { useState, useEffect } from "react";
import jobCrit from "../mock_db/job_title.json"

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // black color for primary
    },
    secondary: {
      main: '#FFFFFF', // white color for secondary
    },
    background: {
      default: '#000000', // black background
      paper: '#FFFFFF', // white background for boxes
    },
    text: {
      primary: '#FFFFFF', // white text
      secondary: '#000000', // black text for contrast
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)', // adjust shadow for better contrast in black and white
        },
      },
    },
  },
})

export default function Home() {
  const [processed, setProcessed] = useState(false);
  const [jobMeta, setJobMeta] = useState({'jobTitle': '', 'jobType': ''});
  const [studentMeta, setStudentMeta] = useState({'gradYear': '', 'major': '', 'race': '', 'gender': '', 
    'sponsor': ''});
  const [jobDes, setJobDes] = useState('');
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [chatbot, setChatbot] = useState('');
  const [myPrompt, setMyPrompt] = useState('');

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
      reader.readAsArrayBuffer(file); 
    });
  };

  const runPython = async () => {
    if (pyodide) {
      try {
        await pyodide.loadPackage(['micropip']);
        await pyodide.runPythonAsync(`
          import micropip
          await micropip.install('PyPDF2')
        `);

        if (resume) {
          await writeFileToPyodideFS(resume);

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

  const formatData = (rawFeedback) => {
    return rawFeedback
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/\n/g, '<br />');
  };

  const validateForm = () => {
    let missingFields = [];

    if (!jobMeta.jobTitle) {
      missingFields.push("Job Title");
    }
    if (!jobMeta.jobType) {
      missingFields.push("Job Type");
    }
    if (!studentMeta.gradYear) {
      missingFields.push("Graduation Month/Year");
    }
    if (!studentMeta.major) {
      missingFields.push("Major");
    }
    if (!resume) {
      missingFields.push("Resume");
    }
    if (!jobDes) {
      missingFields.push("Job Description");
    }

    // If there are missing fields, show an alert
    if (missingFields.length > 0) {
      alert("Please fill out the following required fields: \n" + missingFields.join(", "));
      return false; // Validation failed
    }

    return true; // Validation passed
};




  const generate = async () => {
    if (!validateForm()) return;
    try {
      runPython();
      setProcessed(true);
      setFeedback("Processing...");
      let user_data = "1. Here is the personal information of the applicant " + JSON.stringify(studentMeta);
      let job_data = "2. Here is the job information:\nTitle: " + jobMeta.jobTitle + "\nDetailed information: " + JSON.stringify(jobMeta) + "\n and " + jobDes;
      let job_criteria = "3. Here is the job criteria: " + jobCrit[jobMeta.jobType ? jobMeta.jobType : "swe"]
      let resume_data = "4. Here is the applicant's resume data: " + resumeText;
      
      const newPrompt = `${user_data}\n\n${job_data}\n\n${job_criteria}\n\n${resume_data}`
      setMyPrompt(newPrompt);
  
      // console.log(jobMeta.jobType)
      // console.log(jobCrit)
      console.log(newPrompt);
  
      const response = await fetch("api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newPrompt,
      });
  
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      
      const data = await response.json(); 
      setFeedback(formatData(data)); 
      // setFeedback(data);
  
    } catch (error) {
      
      console.error("Error during API call:", error.message);
    }
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <h1 className={styles.h1}>Resu<p className={styles.title}>Mate</p></h1>
          {/* <div className={styles.row0}>
            <Image src="https://imgur.com/a/OlNsBYh.png" alt="ResuMate" width={200} height={200} />
          </div> */}
      
          <div className={styles.row}>
            <JobMeta jobMeta={jobMeta} setJobMeta={setJobMeta} />
            <StudentMeta studentMeta={studentMeta} setStudentMeta={setStudentMeta} />
          </div>
          <div className={styles.row}>
            <JobDes jobDes={jobDes} setJobDes={setJobDes} />
            <Resume resume={resume} setResume={setResume} setProcessed={setProcessed} pyodide={pyodide} runPython={runPython}/>
          </div>

          <div className={styles.row0}>
            <form className={styles.form}>
              <Reset setJobMeta={setJobMeta} setProcessed={setProcessed} setStudentMeta={setStudentMeta}
                setJobDes={setJobDes} setResume={setResume} setFeedback={setFeedback} setMyPrompt={setMyPrompt} />
                
              {!processed ? ( 
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Process generate={generate} />
                </>        
              ): null}
            </form>
          </div>
          
          {processed ? (
          <div className={styles.row}>
            <Feedback feedback={feedback} setFeedback={setFeedback}/>
            <Chatbot chatbot={chatbot} setChatbot={setChatbot} myPrompt={myPrompt} feedback={feedback} formatData={formatData}/>
          </div>
          ) : (
            null
          )}
        </ThemeProvider>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
