import React, { useState, useEffect, useContext, useCallback } from 'react';
import { multiStepContext } from '../../../store/step-context';
import AuthContext from '../../../store/auth-context';

import NewJob from './NewJob/NewJob';
import JobList from './JobList';
import ShowCandidatesModal from './FilterCandidates/ShowCandidatesModal';
import MatchCandidateModal from './FilterCandidates/MatchCandidateModal';
import './CompanyJobs.css';

import db from '../../../firebase';
import { collection, onSnapshot, query, addDoc, where, doc, getDoc, updateDoc } from 'firebase/firestore';

const CompanyJobs = () => {
    const { matchConfirm } = useContext(multiStepContext);
    const authCtx = useContext(AuthContext);

    const [companyProfileData, setCompanyProfileData] = useState({});
    const [jobsRender, setJobsRender] = useState([]);

    const fetchCompanyData = useCallback(async () => {
        if (!authCtx.companyID) {
            return;
        }

        const companyRef = doc(db, "companies", authCtx.companyID);
        const data = await getDoc(companyRef);
        setCompanyProfileData(data.data());
    }, [authCtx]);

    const fetchJobs = useCallback(() => {
        const q = query(collection(db, "jobs"), where("companyID", "==", authCtx.companyID))
        onSnapshot(q, (querySnapshot) => {
            const listOfJobs = [];
            querySnapshot.forEach((doc) => {
                listOfJobs.push(doc.data());
            });
            setJobsRender(listOfJobs);
        });
    }, [authCtx]);

    useEffect(() => {
        fetchCompanyData(authCtx.companyID);
        fetchJobs();
    }, [authCtx, fetchCompanyData, fetchJobs])

    const addJob = async (jobData) => {
        const docRef = await addDoc(collection(db, "jobs"), {
            title: jobData.title,
            type: jobData.type,
            location: jobData.location,
            companyID: authCtx.companyID,
            companyName: companyProfileData.companyName,
            description: jobData.description,
            date: jobData.date,
            salary: jobData.salary,
            applicantsID: [],
        });
        const newJobRef = doc(db, "jobs", docRef.id);
        await updateDoc(newJobRef, {
            jobID: docRef.id,
        });
    }

    const addJobHandler = (jobData) => {
        addJob(jobData);
    };

    return (
        <div>
            <h1>Mirëserdhët në panelin e {companyProfileData.companyName}!</h1>
            <NewJob onAddjob={addJobHandler} />
            <h1>Ofertat tuaja të punës!</h1>
            {<JobList items={jobsRender} />}
            <ShowCandidatesModal items={jobsRender} />
            {matchConfirm && <MatchCandidateModal />}
        </div>
    );
};

export default CompanyJobs;