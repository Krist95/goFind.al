import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';
import './Resume.css';

function Skills() {
    const { setStep, setFinalData } = useContext(multiStepContext);
    const [skillsInputList, setSkillInputList] = useState([{ skill: "" }]);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...skillsInputList];
        list[index][name] = value;
        setSkillInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...skillsInputList];
        list.splice(index, 1);
        setSkillInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setSkillInputList([...skillsInputList, { skill: "" }]);
    };

    function nextStep(e) {
        e.preventDefault();
        setFinalData(finalData => [...finalData, skillsInputList]);
        setStep(5);
    }

    return (
        <form onSubmit={nextStep} className="App">
            {skillsInputList.map((item, i) => {
                return (
                    <div className="box" key={i} >
                        <div>
                            <TextField
                                className="textField"
                                label="Aftësitë e mia"
                                name="skill"
                                value={item.firstName}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>

                        <div className="btn-box">
                            {skillsInputList.length !== 1 && <button
                                className="remove_button"
                                onClick={() => handleRemoveClick(i)}>Hiq</button>}
                            {skillsInputList.length - 1 === i && <button
                                className="add_button"
                                onClick={handleAddClick}>Shto</button>}
                        </div>
                    </div>
                );
            })}
            {/*<div style={{ marginTop: 20 }}>{(JSON.stringify(skillsInputList, null, 2))}</div>*/}
            <div>
                <button type="submit" className="next_button">Kategoria e rradhës</button>
            </div>
        </form>
    );
};
export default Skills;