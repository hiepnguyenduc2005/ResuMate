import React from 'react';
import styles from './components.module.css';

export default function Process({resumeText, generate}) {
    
    const handleClick = () => {
        if (resumeText){
            generate(); 
        }      
    };
    

    return (
        <input className={styles.button} type="button" variant="contained" color="primary" onClick={handleClick} value="Process"/>
    );
    }