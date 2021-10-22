import React, { useState } from 'react';

import JobForm from './JobForm';
import './NewJob.css';

const NewJob = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveJobDataHandler = (enteredJobData) => {
        const jobData = {
            ...enteredJobData,
            id: Math.random().toString(),
        };
        props.onAddjob(jobData);
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='new-job'>
            {!isEditing && (
                <button onClick={startEditingHandler}>Shtoni një punë të re!</button>
            )}
            {isEditing && (
                <JobForm
                    onSaveJobData={saveJobDataHandler}
                    onCancel={stopEditingHandler}
                />
            )}
        </div>
    );
};

export default NewJob;