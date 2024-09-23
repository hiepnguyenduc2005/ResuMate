import React from 'react';
import styles from './components.module.css';

export default function JobDes({jobDes, setJobDes, setProcessed}) {

    const handleChange = (e) => {
        setJobDes(e.target.value);
        setProcessed(false);
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