import React from 'react';
import styles from './components.module.css';

export default function Resume({ resume, setResume, setProcessed, pyodide }) {

  const handleChange = (e) => {
    setResume(e.target.files[0]);
    setProcessed(false);
  };

  return (
    <div>
      <h2>Resume</h2>
      <br />
      <form className={styles.form}>
        <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleChange} disabled={!pyodide}/>
        <label htmlFor="resume">Choose a File</label>
        <br />
        <span>{resume ? resume.name : "No file chosen"}</span>
      </form>
    </div>
  );
}
