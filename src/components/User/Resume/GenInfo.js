import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';
import './Resume.css';

function GenInfo() {
    const { setStep, userData, setUserData, setFinalData } = useContext(multiStepContext);

    function nextStep(e) {
        e.preventDefault();
        localStorage.removeItem("ResumeData");
        setFinalData([]);
        setFinalData(finalData => [...finalData, userData]);
        setStep(2);
    }
    return (
        <form onSubmit={nextStep}>
            <div>
                <TextField
                    className="textField"
                    label="First name"
                    value={userData["firstname"]}
                    onChange={(e) => setUserData({ ...userData, "firstname": e.target.value })}
                    margin="normal"
                    variant="outlined"
                    required />
            </div>
            <div>
                <TextField
                    className="textField"
                    label="Last name"
                    value={userData["lastname"]}
                    onChange={(e) => setUserData({ ...userData, "lastname": e.target.value })}
                    margin="normal"
                    variant="outlined"
                    required />
            </div>
            <div>
                <TextField
                    className="textField"
                    label="Contact number"
                    value={userData["contact"]}
                    onChange={(e) => setUserData({ ...userData, "contact": e.target.value })}
                    margin="normal"
                    variant="outlined"
                    required />
            </div>
            <div>
                <TextField
                    className="textField"
                    label="Address"
                    value={userData["cel"]}
                    onChange={(e) => setUserData({ ...userData, "cel": e.target.value })}
                    margin="normal"
                    variant="outlined"
                    required />
            </div>
            <div>
                <TextField
                    className="textField"
                    label="Email"
                    value={userData["email"]}
                    onChange={(e) => setUserData({ ...userData, "email": e.target.value })}
                    margin="normal"
                    variant="outlined"
                    required />
            </div>
            <button type='submit' className="next_button" >Kategoria e rradhës</button>
        </form>
    )
};

export default GenInfo;