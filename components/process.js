import React from 'react';
import styles from './components.module.css';

export default function Process({generate}) {
    
    const handleClick = async () => {
        generate();       
    };
    

    return (
        <input className={styles.button} type="button" variant="contained" color="primary" onClick={handleClick} value="Process"/>
    );
    }