import React, { useState } from 'react';

import './JobForm.css';

const JobForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredSalary, setEnteredSalary] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredType, setEnteredType] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const salaryChangeHandler = (event) => {
        setEnteredSalary(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const typeChangeHandler = (event) => {
        setEnteredType(event.target.value);
    };

    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const jobData = {
            title: enteredTitle,
            salary: enteredSalary,
            date: new Date(enteredDate),
            description: enteredDescription,
            type: enteredType,
            location: enteredLocation,
        };

        props.onSaveJobData(jobData);
        setEnteredTitle('');
        setEnteredSalary('');
        setEnteredDate('');
        setEnteredDescription('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-job__controls'>
                <div className='new-job__control'>
                    <label>Titulli i punës</label>
                    <input
                        type='text'
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                        required
                    />
                </div>
                <div className='new-job__control'>
                    <label>Lloji i punës</label>
                    <select
                        value={enteredType}
                        onChange={typeChangeHandler}
                        required
                    >
                        <option value="none" selected hidden>
                            Zgjidhni një opsion
                        </option>
                        <option value="Full time">Full time</option>
                        <option value="Part time">Part time</option>
                        <option value="Me kontratë">Me kontratë</option>
                    </select>
                </div>
                <div className='new-job__control'>
                    <label>Pagesa (në $)</label>
                    <input
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={enteredSalary}
                        onChange={salaryChangeHandler}
                        required
                    />
                </div>
                <div className='new-job__control'>
                    <label>Vendndodhja e punës</label>
                    <select
                        value={enteredLocation}
                        onChange={locationChangeHandler}
                        required
                    >
                        <option value="none" selected hidden>
                            Zgjidhni një opsion
                        </option>
                        <option value="Remote">Remote</option>
                        <option value="Në zyrë">Në zyrë</option>
                    </select>
                </div>
                <div className='new-job__control'>
                    <label>Përshkrimi i punës</label>
                    <textarea
                        type='text'
                        value={enteredDescription}
                        onChange={descriptionChangeHandler}
                        required
                    />
                </div>
                <div className='new-job__control'>
                    <label>Data</label>
                    <input
                        type='date'
                        placeholder="Starting Date"
                        value={enteredDate}
                        onChange={dateChangeHandler}
                        required
                    />
                </div>
            </div>
            <div className='new-job__actions'>
                <button type="button" onClick={props.onCancel}>Anullo</button>
                <button type='submit'>Krijo ofertën</button>
            </div>
        </form>
    );
};

export default JobForm;