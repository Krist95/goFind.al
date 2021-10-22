import { Box } from "@material-ui/core";
import { Fragment, useContext, useState, useEffect, useCallback } from "react";
import { multiStepContext } from "../../store/step-context";
import AuthContext from "../../store/auth-context";

import JobCard from "./UserJobList/JobCard";
import Searchbar from "./UserJobList/Searchbar";
import CheckModal from "../Layout/UI/CheckModal";

import db from '../../firebase';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';


const MyApplications = () => {
    const authCtx = useContext(AuthContext);
    const {
        checkModal, setCheckModal,
        checkModal1, setCheckModal1,
        checkModal2, setCheckModal2
    } = useContext(multiStepContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtersOn, setFiltersOn] = useState(false);
    const [jobSearch1, setJobSearch1] = useState({
        type: "Full time",
        location: "Remote",
    });
    const [jobData, setJobData] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const fetchJobs = useCallback(async () => {
        const jobsRef1 = collection(db, 'jobs');
        const data = await getDocs(jobsRef1);
        const listOfData = data.docs.map(doc => doc.data());
        setJobData(listOfData);
    }, []);

    const fetchAppliedJobs = useCallback(async () => {
        const q = query(collection(db, 'jobs'), where("applicantsID", "array-contains", authCtx.userID));
        onSnapshot(q, (querySnapshot) => {
            const listOfAppliedJobs = [];
            querySnapshot.forEach((doc) => {
                listOfAppliedJobs.push(doc.data());
            });
            setAppliedJobs(listOfAppliedJobs);
        })
    }, [authCtx]);

    useEffect(() => {
        fetchJobs();
        fetchAppliedJobs();
    }, [authCtx, fetchJobs, fetchAppliedJobs])

    const searchTermHandler = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleChange = (e) => {
        e.persist();
        setJobSearch1((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const toggleFilters = () => {
        setFiltersOn(!filtersOn);
    }

    return (
        <Fragment>
            <Box>
                <h1>Lista e aplikimeve të mia:</h1>
                {appliedJobs.map(job => <JobCard open={() => setCheckModal(job)} key={job.jobID} {...job} />)}
            </Box>
            <Box mt={20} mb={10}>
                <Searchbar
                    state={jobSearch1}
                    state1={handleChange}
                    state2={toggleFilters}
                    state3={filtersOn}
                    searchTermHandler={searchTermHandler}
                />
                {!filtersOn && jobData.filter((job) => {
                    if (searchTerm === "") {
                        return job
                    } else if (
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return job
                    }
                    return false;
                }).map((job, key) => {
                    return (
                        <JobCard open={() => setCheckModal1(job)} key={job.jobID} {...job} />
                    )
                })}
                {filtersOn && jobData.filter((job) => {
                    if (job.type === jobSearch1.type || job.location === jobSearch1.location) {
                        return job
                    }
                    return false;
                }).map((job, key) => {
                    return (
                        <JobCard open={() => setCheckModal2(job)} key={job.jobID} {...job} />
                    )
                })}
            </Box>
            <CheckModal job={checkModal} closeModal={() => setCheckModal({})}
            />
            <CheckModal job={checkModal1} closeModal={() => setCheckModal1({})}
            />
            <CheckModal job={checkModal2} closeModal={() => setCheckModal2({})}
            />
        </Fragment>
    )
};

export default MyApplications;