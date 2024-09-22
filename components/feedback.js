import React from 'react';
import styles from './components.module.css';
// import ReactMarkdown from 'react-markdown';

export default function Feedback({feedback, setFeedback}) {

    return (
        <div>
        <h2>Feedback</h2>
        <br/>
        <p dangerouslySetInnerHTML={{ __html: feedback }} className={styles.p}></p>
        {/* <ReactMarkdown className={styles.p}>{feedback}</ReactMarkdown> */}
        </div>
    );
    }