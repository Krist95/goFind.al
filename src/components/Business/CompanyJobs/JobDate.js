import React from 'react';

import './JobDate.css';

const JobDate = (props) => {
    // const month = props.date.toLocaleString('en-US', { month: 'long' });
    // const day = props.date.toLocaleString('en-US', { day: '2-digit' });
    // const year = props.date.getFullYear();

    const month = props.date.toDate().toLocaleString('en-US', { month: 'long' });
    const day = props.date.toDate().toLocaleString('en-US', { day: '2-digit' });
    const year = props.date.toDate().getFullYear();

    return (
        <div className='job-date'>
            <div className='job-date__month'>{month}</div>
            <div className='job-date__year'>{year}</div>
            <div className='job-date__day'>{day}</div>
        </div>
    );
};

export default JobDate;