import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';
import './Resume.css';

function Languages() {
    const { setStep, setFinalData, setUserData, setIsSubmited } = useContext(multiStepContext);
    const [languageInputList, setLanguageInputList] = useState([{ language: "" }]);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...languageInputList];
        list[index][name] = value;
        setLanguageInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...languageInputList];
        list.splice(index, 1);
        setLanguageInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setLanguageInputList([...languageInputList, { language: "" }]);
    };

    function submitDataHandler(e) {
        e.preventDefault();
        setFinalData(finalData => [...finalData, languageInputList]);
        setUserData("");
        setIsSubmited(true);
        setStep(1);
    }

    return (
        <form onSubmit={submitDataHandler} className="App">
            {languageInputList.map((item, i) => {
                return (
                    <div className="box" key={i} >
                        <div>
                            <TextField
                                className="textField"
                                label="Gjuhët e huaja"
                                name="language"
                                value={item.firstName}
                                onChange={e => handleInputChange(e, i)}
                                margin="normal"
                                variant="outlined"
                                required />
                        </div>

                        <div className="btn-box">
                            {languageInputList.length !== 1 && <button
                                className="remove_button"
                                onClick={() => handleRemoveClick(i)}>Hiq</button>}
                            {languageInputList.length - 1 === i && <button
                                className="add_button"
                                onClick={handleAddClick}>Shto</button>}
                        </div>
                    </div>
                );
            })}
            {/*<div style={{ marginTop: 20 }}>{(JSON.stringify(languageInputList, null, 2))}</div>*/}
            <div>
                <button type="submit" className="next_button">Konfirmo</button>
            </div>
        </form>
    );
};
export default Languages;