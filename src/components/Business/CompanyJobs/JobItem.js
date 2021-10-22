import React, { useContext } from 'react';
import { multiStepContext } from '../../../store/step-context';
import JobDate from './JobDate';
import Card from '../../Layout/UI/Card';
import '../CompanyJobs/JobItem.css';

import db from '../../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const JobItem = (props) => {
    const { setCandidatesModal, setSelectedJobId } = useContext(multiStepContext);

    const openModalHandler = () => {
        setSelectedJobId(props.jobID);
        setCandidatesModal(true);
    }

    const deleteJob = async () => {
        await deleteDoc(doc(db, "jobs", props.jobID));
    }

    const deleteJobHandler = () => {
        deleteJob();
    }

    return (
        <li>
            <Card className='job-item' >
                <JobDate date={props.date} />
                <div className='job-item__description'>
                    <h3>{props.title}</h3>
                    <h5><span className='text'>{props.description}</span></h5>
                    <h5>{props.type} | {props.location}</h5>
                    <div className='job-item__price'>${props.salary}</div>
                    <div className='button-container'>
                        <button className='btn' onClick={openModalHandler}>Gjej kandidatin ideal</button>
                        <button className='btn1' onClick={deleteJobHandler}>Fshij punen</button>
                    </div>
                </div>
            </Card>
        </li>
    );
};

export default JobItem;