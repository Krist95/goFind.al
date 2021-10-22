import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../../Layout/UI/Card';
import { Button } from '@material-ui/core';
import classes from './MatchCandidateModal.module.css';
import { multiStepContext } from '../../../../store/step-context';
import { Fragment } from 'react';
import db from '../../../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const MatchCandidateModal = (props) => {
    const { setMatchConfirm, selectedJobId, idealCandidate } = useContext(multiStepContext);

    function cancelModalHandler() {
        setMatchConfirm(false);
    }

    let history = useHistory();

    const confirmModalHandler = async () => {
        await deleteDoc(doc(db, "jobs", selectedJobId));
        //Email the user he won the job

        setMatchConfirm(false);
        history.push('/company-offers');
    }

    return (
        <Fragment>
            <div className={classes.backdrop} onClick={props.onConfirm} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>Jeni vetëm një hap larg!</h2>
                </header>
                <div className={classes.content}>
                    <p>Kandidati më i mirë është {idealCandidate.firstname} {idealCandidate.lastname}.</p>
                    <p>Klikoni "Përzgjidh" për të konfirmuar ose "Anullo" për tu kthyer mbrapsht.</p>
                </div>
                <footer className={classes.actions}>
                    <Button
                        style={{ color: '#fff', backgroundColor: '#4f005f', borderRadius: '15px', margin: '0.5rem' }}
                        onClick={cancelModalHandler}>Anullo</Button>
                    <Button
                        style={{ color: '#fff', backgroundColor: '#4f005f', borderRadius: '15px', margin: '0.5rem' }}
                        onClick={confirmModalHandler}>Përzgjidh</Button>
                </footer>
            </Card>
        </Fragment>
    );
};

export default MatchCandidateModal;