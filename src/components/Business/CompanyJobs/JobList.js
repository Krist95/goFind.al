import React from 'react';
import Card from '../../Layout/UI/Card';
import JobItem from './JobItem';
import './JobList.css';

const Jobs = (props) => {
    if (props.items.length === 0) {
        return <h2 className='job-list__fallback'>Nuk ka oferta aktive...</h2>;
    }
    /* Vendos logjiken per te hapur dhe mbyllur modal me butonin per te filtruar*/
    return (
        <Card className='jobs'>
            <ul className='job-list' >
                {props.items.map((job) => (
                    <JobItem
                        key={job.jobID}
                        jobID={job.jobID}
                        title={job.title}
                        type={job.type}
                        location={job.location}
                        description={job.description}
                        date={job.date}
                        salary={job.salary}
                        applicantsID={job.applicantsID}
                    />
                ))}
            </ul>
        </Card>
    );
};

export default Jobs;


