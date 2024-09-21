import React, { useState } from 'react';
import styles from './components.module.css';

export default function Resume() {
    const [resume, setResume] = useState(null);
    
    const handleChange = (e) => {
        setResume(e.target.files[0]);
    }
    
    return (
        <div>
            <h2>Resume</h2>
            <br />
            <form className={styles.form}>
                <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleChange}/>
                <label htmlFor="resume">Choose File</label> 
                <br />
                <span>{resume ? resume.name : "No file chosen"}</span>
            </form>
        </div>
    );
}
