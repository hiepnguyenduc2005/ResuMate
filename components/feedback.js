import React from 'react';
import styles from './components.module.css';

export default function Feedback({feedback, setFeedback}) {

    const handleChange = (e) => {
        setFeedback(e.target.value);
    }

    return (
        <div>
        <h2>Feedback</h2>
        <br/>
        <form className={styles.form}>
            <textarea rows="10" cols="50" name="feedback" placeholder="Feedback" value={feedback} onChange={handleChange}/>      
            <br/>
        </form>
        </div>
    );
    }