import React from 'react';
import { useState } from 'react';
import styles from './components.module.css';

export default function Process({handleProcessed}) {
    const handleClick = () => {
        handleProcessed(true);
    }

    return (
        <div>
            <form className={styles.form}>
                <input type="button" variant="contained" color="primary" onClick={handleClick} value="Process"/>
            </form>
        </div>
    );
    }