import React from 'react';
import styles from './components.module.css';

export default function Chatbot({chatbot, setChatbot}) {

    const handleChange = (e) => {
        setChatbot(e.target.value);
    }

    return (
        <div>
        <h2>Chatbot</h2>
        <br/>
        <form className={styles.form}>
            <textarea rows="10" cols="50" name="jobDes" placeholder="Chatbot" value={chatbot} onChange={handleChange}/>      
            <br/>
        </form>
        </div>
    );
    }