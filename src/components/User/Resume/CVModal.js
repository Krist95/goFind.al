import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../Layout/UI/Card';
import { Button } from '@material-ui/core';
import classes from './CVModal.module.css';
import { multiStepContext } from '../../../store/step-context';
import AuthContext from '../../../store/auth-context';
import db from '../../../firebase';
import { doc, updateDoc } from "firebase/firestore";


const ErrorModal = (props) => {
    const { setIsSubmited, finalData } = useContext(multiStepContext);
    const authCtx = useContext(AuthContext);


    function cancelModalHandler() {
        setIsSubmited(false);
    }

    let history = useHistory();

    const submitModalHandler = async () => {
        localStorage.setItem("ResumeData", JSON.stringify(finalData));
        // const docRef = await setDoc(doc(db, "userResumes", authCtx.userID), { userResume: JSON.stringify(finalData) });
        const selectedUser = doc(db, "users", authCtx.userID);
        await updateDoc(selectedUser, {
            myResume: JSON.stringify(finalData),
        });
        setIsSubmited(false);
        history.push('/myapplications');
    }

    return (
        <Fragment>
            <div className={classes.backdrop} onClick={props.onConfirm} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>Jeni vetëm një hap larg përditësimit të CV tuaj!</h2>
                </header>
                <div className={classes.content}>
                    <p>A jeni të sigurt që doni të përditësoni CV tuaj?</p>
                    <p>Të dhënat e vjetra do të zëvëndësohen me ato të CV së re.</p>
                    <p>Klikoni "Konfirmo" për të konfirmuar ose "Anullo" për tu kthyer mbrapa.</p>
                </div>
                <footer className={classes.actions}>
                    <Button
                        style={{ color: '#fff', backgroundColor: '#4f005f', borderRadius: '15px', margin: '0.5rem' }}
                        onClick={cancelModalHandler}>Anullo</Button>
                    <Button
                        style={{ color: '#fff', backgroundColor: '#4f005f', borderRadius: '15px', margin: '0.5rem' }}
                        onClick={submitModalHandler}>Konfirmo</Button>
                </footer>
            </Card>
        </Fragment>
    );
};

export default ErrorModal;