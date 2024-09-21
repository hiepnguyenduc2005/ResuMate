import React from 'react';
import { useState } from 'react';
import styles from './components.module.css';

export default function JobDes() {
    const [jobDes, setJobDes] = useState('');

    const handleChange = (e) => {
        setJobDes(e.target.value);
    }

    return (
        <div>
        <h2>Job Desciption</h2>
        <br/>
        <form className={styles.form}>
            <textarea rows="10" cols="50" name="jobDes" placeholder="Job Description" value={jobDes} onChange={handleChange}/>      
            <br/>
        </form>
        </div>
    );
    }