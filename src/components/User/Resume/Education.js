import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';
import './Resume.css';

function Education() {
    const { setStep, setFinalData } = useContext(multiStepContext);
    const [educationInputList, setEducationInputList] = useState([{ studyfield: "", studyinstitution: "", studyfrom: "", studyto: "", studydetails: "" }]);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...educationInputList];
        list[index][name] = value;
        setEducationInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...educationInputList];
        list.splice(index, 1);
        setEducationInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setEducationInputList([...educationInputList, { studyfield: "", studyinstitution: "", studyfrom: "", studyto: "", studydetails: "" }]);
    };

    function nextStep(e) {
        e.preventDefault();
        setFinalData(finalData => [...finalData, educationInputList]);
        setStep(3);
    }

    return (
        <form onSubmit={nextStep} className="App">
            {educationInputList.map((item, i) => {
                return (
                    <div className="box" key={i} >
                        <div>
                            <TextField
                                className="textField"
                                label="Fusha e studimit"
                                name="studyfield"
                                value={item.studyfield}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Institucioni"
                                name="studyinstitution"
                                value={item.studyinstitution}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Nga"
                                name="studyfrom"
                                value={item.studyfrom}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Në"
                                name="studyto"
                                value={item.studyto}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Detaje shtesë"
                                name="studydetails"
                                value={item.studydetails}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="btn-box">
                            {educationInputList.length !== 1 && <button
                                className="remove_button"
                                onClick={() => handleRemoveClick(i)}>Hiq</button>}
                            {educationInputList.length - 1 === i && <button
                                className="add_button"
                                onClick={handleAddClick}>Shto</button>}
                        </div>
                    </div>
                );
            })}
            {/*<div style={{ marginTop: 20 }}>{(JSON.stringify(educationInputList, null, 2))}</div>*/}
            <button type="submit" className="next_button">Kategoria e rradhës</button>
        </form>
    );
};

export default Education;