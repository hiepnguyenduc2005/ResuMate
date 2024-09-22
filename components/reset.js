import React from 'react';
import styles from './components.module.css';

export default function Reset ({ setJobMeta, setStudentMeta, setJobDes, setResume, setFeedback, setMyPrompt, setProcessed}) {
    
    const handleClick = async () => {
        setJobMeta({'jobTitle': '', 'jobType': ''});
        setStudentMeta({'gradYear': '', 'major': '', 'race': '', 'gender': '', 'sponsor': ''});
        setJobDes('');
        setResume(null);
        setFeedback('');
        setMyPrompt('');
        setProcessed(false);
    };
    

    return (
        <div>
            <form className={styles.form}>
                <input type="button" variant="contained" color="primary" onClick={handleClick} value="Reset All"/>
            </form>
        </div>
    );
    }