import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    IconButton,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useContext, useState, useEffect, useCallback, Fragment } from 'react';
import { multiStepContext } from '../../../../store/step-context';
import classes from './ShowCandidatesModal.module.css';
import db from '../../../../firebase';
import { collection, where, getDocs, query, documentId } from 'firebase/firestore';

const ShowCandidatesModal = (props) => {
    const filters = [
        'Edukimi',
        'Eksperienca',
        'Aftësitë',
        'Gjuhët e huaja',
    ];
    const initialFilters = filters.map(() => '');

    const [userData, setUserData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);

    //TEST ENABLE BUTTON
    const [buttonEnabled, setButtonEnabled] = useState(true);

    //detailedSearch per filtrimin e vecante
    const [detailedSearch, setDetailedSearch] = useState(false);
    //candidatesModal per state e modal, matchConfirm per state e modalit konfirmues
    const {
        candidatesModal,
        setCandidatesModal,
        setMatchConfirm,
        selectedJobId,
        setIdealCandidate,
    } = useContext(multiStepContext);

    const closeModalHandler = () => {
        setCandidatesModal(false);
        setDetailedSearch(false);
        setSelectedFilters(initialFilters);
    }
    const viewLessHandler = (props) => {
        setDetailedSearch(false);
    }
    const viewMoreHandler = (props) => {
        setDetailedSearch(true);
        setSelectedFilters(initialFilters);
    }
    const openMatchModalHandler = () => {
        setCandidatesModal(false);
        setDetailedSearch(false);
        setMatchConfirm(true);

        const bestCandidate = findIdealCandidate();
        setIdealCandidate(bestCandidate);
    }

    const listOfApplicants = useCallback(async () => {
        const listOfCompanyJobs = props.items;
        const selectedJob = listOfCompanyJobs.find(job => job.jobID === selectedJobId);

        if (!selectedJob || selectedJob.applicantsID.length === 0) {
            setUserData([]);
            return;
        }

        const usersQuery = query(
            collection(db, "users"),
            where(documentId(), "in", selectedJob.applicantsID)
        );

        const users = [];

        const usersQuerySnapshot = await getDocs(usersQuery);

        usersQuerySnapshot.forEach((doc) => users.push({
            id: doc.id,
            ...doc.data(),
        }));

        setUserData(users);
    }, [selectedJobId, props.items]);

    useEffect(() => {
        listOfApplicants();
    }, [selectedJobId, listOfApplicants]);

    const changeFilterValueHandler = (event, index) => {
        const value = event.target.value;
        let newFilterValues = [...selectedFilters];

        if (index >= newFilterValues.length) {
            newFilterValues.push(value);
        } else {
            newFilterValues[index] = value;
        }

        //Sort items: all empty values in the end.
        newFilterValues = [
            ...newFilterValues.filter(x => x !== ''),
            ...newFilterValues.filter(x => x === ''),
        ];

        setSelectedFilters(newFilterValues);
    }

    const findIdealCandidate = () => {
        let users = [...userData].map(user => {
            user.resume = JSON.parse(user.myResume || "[]");
            return user;
        });

        selectedFilters.forEach((value, idx) => {
            if (users.length === 1) {
                return;
            }

            //Find respective index in resume from selctedFilters.
            const index = (selectedFilters.filter(Boolean).length === 0 ? idx : filters.indexOf(value)) + 1;

            //Get maximum count in user resumes of current filter.
            const maxCount = Math.max(...users.map(u => (u.resume[index]?.length || 0)));

            //Get all users with maximum count.
            users = Array.from(users.filter(u => (u.resume[index]?.length || 0) === maxCount));
        });

        return users[0];
    }
    useEffect(() => {
        if (userData.length) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [userData]);

    return (
        <Dialog open={candidatesModal} fullWidth>
            <DialogTitle>
                <Box mb={0} display="flex" color="#38015c" justifyContent="space-between" alignItems="center">
                    Lista e aplikanteve:
                    <IconButton onClick={closeModalHandler} >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                    {userData.length ? null : <p>Nuk ka aplikime aktive...</p>}
                    {userData.map(user => <p className={classes.p} key={user.id}>{user.firstname} {user.lastname}</p>)}
                    {detailedSearch && <Fragment>
                        <Box display="flex" className={classes.main}>
                            {selectedFilters.map((selectedValue, index) => (selectedValue === '' && selectedFilters.lastIndexOf(selectedValue) !== index) ? null : (
                                <select
                                    className={classes.select}
                                    key={index}
                                    value={selectedValue}
                                    onChange={(event) => changeFilterValueHandler(event, index)}
                                    disabled={!buttonEnabled}>
                                    <option
                                        className={classes.selected_option}
                                        value=""
                                    >Zgjidhni një opsion</option>
                                    {filters.filter(item => selectedValue === item || !selectedFilters.includes(item)).map((filter, index2) => (
                                        <option key={index2} value={filter}>{filter}</option>
                                    ))}
                                </select>
                            ))}
                        </Box>
                        <button className={classes.btn_getBc} onClick={openMatchModalHandler} disabled={!buttonEnabled}>Gjej kandidatin e preferuar</button>
                        <button className={classes.btn_chngFlt} onClick={viewLessHandler}>Filtro ne menyre automatike</button>
                    </Fragment>
                    }
                    {!detailedSearch && <button className={classes.btn_chngFlt} onClick={viewMoreHandler}>Perzgjidh opsionet e filtrimit</button>}
                </Box>
            </DialogContent>
            <DialogActions>
                {!detailedSearch && <button className={classes.btn_getBc} onClick={openMatchModalHandler} disabled={!buttonEnabled}>Gjej kandidatin ideal</button>}
            </DialogActions>
        </Dialog >
    );
};

export default ShowCandidatesModal;