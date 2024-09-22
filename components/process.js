import React from 'react';
import styles from './components.module.css';

export default function Process({handleProcessed, generate, setFeedback}) {
    
    const handleClick = async () => {
        handleProcessed(true);
        setFeedback("Processing...");
        generate();       
    };
    

    return (
        <div>
            <form className={styles.form}>
                <input type="button" variant="contained" color="primary" onClick={handleClick} value="Process"/>
            </form>
        </div>
    );
    }