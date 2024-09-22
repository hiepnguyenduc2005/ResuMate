import React from 'react';
import styles from './components.module.css';

export default function StudentMeta({studentMeta, setStudentMeta}) {
    const handleChange = (e) => {
        const {name, value} = e.target;
        setStudentMeta(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
        <h2>Applicant Summary</h2>
        <br/>
        <form className={styles.form}>
            <input type="text" name="gradYear" placeholder="Graduation Month/Year (format: mm/yyyy)" value={studentMeta.gradYear} onChange={handleChange}/>
            <br/>
            <input type="text" name="major" placeholder="Major" value={studentMeta.major} onChange={handleChange}/>
            <br/>
            <select name="race" value={studentMeta.race} onChange={handleChange}>
                <option value="" default disabled>Race</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="his_la">Hispanic or Latino</option>
                <option value="asian">Asian</option>
                <option value="native">American Indian or Alaska Native</option>
                <option value="pacific">Native Hawaiian or Pacific Islander</option>
                <option value="other">Prefer not to say</option>
            </select>
            <br/>
            <select name="gender" value={studentMeta.gender} onChange={handleChange}>
                <option value="" default disabled>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non">Non-binary</option>
                <option value="other">Prefer not to say</option>
            </select>               
            <br/>
            <select name="sponsor" value={studentMeta.sponsor} onChange={handleChange}>
                <option value="" default disabled>Are you an international student?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <br/>
        </form>
        </div>
    );
    }