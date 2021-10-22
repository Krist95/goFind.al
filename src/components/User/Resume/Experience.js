import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';
import './Resume.css';

function Experience() {
    const { setStep, setFinalData } = useContext(multiStepContext);
    const [experienceInputList, setExperienceInputList] = useState([{ jobpost: "", companyname: "", jobcountry: "", workedfrom: "", workedto: "", jobdescription: "" }]);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...experienceInputList];
        list[index][name] = value;
        setExperienceInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...experienceInputList];
        list.splice(index, 1);
        setExperienceInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setExperienceInputList([...experienceInputList, { jobpost: "", companyname: "", jobcountry: "", workedfrom: "", workedto: "", jobdescription: "" }]);
    };

    function nextStep(e) {
        e.preventDefault();
        setFinalData(finalData => [...finalData, experienceInputList]);
        setStep(4);
    }

    return (
        <form onSubmit={nextStep} className="App">
            {experienceInputList.map((item, i) => {
                return (
                    <div className="box" key={i} >
                        <div>
                            <TextField
                                className="textField"
                                label="Pozicioni i punës"
                                name="jobpost"
                                value={item.jobpost}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Emri i kompanisë apo institucionit"
                                name="companyname"
                                value={item.companyname}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Vendndodhja"
                                name="jobcountry"
                                value={item.jobcountry}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Nga"
                                name="workedfrom"
                                value={item.workedfrom}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Në"
                                name="workedto"
                                value={item.workedto}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>
                        <div>
                            <TextField
                                className="textField"
                                label="Detaje shtesë"
                                name="jobdescription"
                                value={item.jobdescription}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="btn-box">
                            {experienceInputList.length !== 1 && <button
                                className="remove_button"
                                onClick={() => handleRemoveClick(i)}>Hiq</button>}
                            {experienceInputList.length - 1 === i && <button
                                className="add_button"
                                onClick={handleAddClick}>Shto</button>}
                        </div>
                    </div>
                );
            })}
            {/*<div style={{ marginTop: 20 }}>{(JSON.stringify(experienceInputList, null, 2))}</div>*/}
            <button type="submit" className="next_button">Kategoria e rradhës</button>
        </form>
    );
};

export default Experience;

