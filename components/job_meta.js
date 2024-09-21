import React from 'react';
import { useState } from 'react';
import styles from './components.module.css';

export default function JobMeta() {
    const [jobMeta, setJobMeta] = useState({'jobTitle': '', 'jobType': ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setJobMeta(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
        <h2>Job Summary</h2>
        <br/>
        <form className={styles.form}>
            <input type="text" name="jobTitle" placeholder="Job Title" value={jobMeta.jobTitle} onChange={handleChange}/>
            <br/>
            <select name="jobType" value={jobMeta.jobType} onChange={handleChange}>
                <option value="" default disabled>Job Type</option>
                <option value="swe">Software Engineer</option>
                <option value="ds_da">Data Scientist/Analyst</option>
                <option value="de">Data Engineer</option>
                <option value="ai">AI Engineer</option>
                <option value="dev">DevOps Engineer</option>
                <option value="qa">QA Engineer</option>
                <option value="pm">Product Manager</option>
                <option value="ux_ui">UX/UI Designer</option>
                <option value="ts">Tech Consultant</option>
                <option value="other">Other</option>
            </select>            
            <br/>
        </form>
        </div>
    );
    }