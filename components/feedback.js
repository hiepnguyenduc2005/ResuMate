import React from 'react';
import { useState } from 'react';
import styles from './components.module.css';

export default function Feedback() {
    const [jobDes, setJobDes] = useState('');

    const handleChange = (e) => {
        setJobDes(e.target.value);
    }

    return (
        <div>
        <h2>Feedback</h2>
        <br/>
        <form className={styles.form}>
            <textarea rows="10" cols="50" name="jobDes" placeholder="Job Description" value={jobDes} onChange={handleChange}/>      
            <br/>
        </form>
        </div>
    );
    }