import { Link } from 'react-router-dom';
import { Fragment, useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { multiStepContext } from '../store/step-context';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

import Searchbar from '../components/User/UserJobList/Searchbar';
import JobCard from '../components/User/UserJobList/JobCard';
import CheckModal from '../components/Layout/UI/CheckModal';

import bg from '../components/Layout/bg.jpg';
import classes from './HomePage.module.css';

const HomePage = () => {
    const {
        checkModal3, setCheckModal3,
        checkModal4, setCheckModal4,
        checkModal5, setCheckModal5
    } = useContext(multiStepContext);

    const [jobData, setJobData] = useState([]);
    const [showFullList, setShowFullList] = useState(false);
    const [filterOn, setFilterOn] = useState(false);
    const [searchTerm1, setSearchTerm1] = useState("");
    const [jobSearch, setJobSearch] = useState({
        type: "Full time",
        location: "Remote",
    });

    useEffect(() => {
        fetchJobs();
    }, [])

    const fetchJobs = async () => {
        const jobsRef = collection(db, 'jobs');
        const data = await getDocs(jobsRef);
        const listOfData = data.docs.map(doc => doc.data());
        setJobData(listOfData);
    }

    const searchTermHandler = (event) => {
        setSearchTerm1(event.target.value);
    }

    const showFullListHandler = () => {
        setShowFullList(true);
    }

    const handleChange = (e) => {
        e.persist();
        setJobSearch((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const toggleFilters = () => {
        setFilterOn(!filterOn);
    }

    return (
        <Fragment>
            <section id="loadMore" className={classes.starting}>
                <div className={classes['main-image']}>
                    <img src={bg} alt="background" />
                    <Link to='/auth' className={classes.link2}>Punëkërkues?</Link>
                    <Link to='/authB' className={classes.link1}>Punëdhënës?</Link>
                </div>
            </section>
            <Searchbar
                state={jobSearch}
                state1={handleChange}
                state2={toggleFilters}
                state3={filterOn}
                searchTermHandler={searchTermHandler}
            />

            {!filterOn && !showFullList && jobData.slice(0, 3).filter((job) => {
                if (searchTerm1 === "") {
                    return job
                } else if (
                    job.title.toLowerCase().includes(searchTerm1.toLowerCase()) ||
                    job.companyName.toLowerCase().includes(searchTerm1.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchTerm1.toLowerCase())) {
                    return job
                }
                return false;
            }).map((job, key) => {
                return (
                    <JobCard open={() => setCheckModal3(job)} key={job.jobID} {...job} />
                )
            })}

            {!filterOn && showFullList && jobData.filter((job) => {
                if (searchTerm1 === "") {
                    return job
                } else if (
                    job.title.toLowerCase().includes(searchTerm1.toLowerCase()) ||
                    job.companyName.toLowerCase().includes(searchTerm1.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchTerm1.toLowerCase())) {
                    return job
                }
                return false;
            }).map((job, key) => {
                return (
                    <JobCard open={() => setCheckModal4(job)} key={job.jobID} {...job} />
                )
            })}

            {filterOn && jobData.filter((job) => {
                if (job.type === jobSearch.type || job.location === jobSearch.location) {
                    return job
                }
                return false;
            }).map((job, key) => {
                return (
                    <JobCard open={() => setCheckModal5(job)} key={job.jobID} {...job} />
                )
            })}

            <Box mt={3} mb={10} textAlign='center'>
                <button className={classes.button} onClick={showFullListHandler} >
                    Ngarko të gjitha punët
                </button>
            </Box>
            <CheckModal job={checkModal3} closeModal={() => setCheckModal3({})} />
            <CheckModal job={checkModal4} closeModal={() => setCheckModal4({})} />
            <CheckModal job={checkModal5} closeModal={() => setCheckModal5({})} />
        </Fragment >
    );
};
export default HomePage;

