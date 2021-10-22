import React, { useState } from 'react';

export const multiStepContext = React.createContext();

const StepContext = (props) => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);

    //Out of context, just a shortcut
    const [checkModal, setCheckModal] = useState({});
    const [checkModal1, setCheckModal1] = useState({});
    const [checkModal2, setCheckModal2] = useState({});
    const [checkModal3, setCheckModal3] = useState({});
    const [checkModal4, setCheckModal4] = useState({});
    const [checkModal5, setCheckModal5] = useState({});
    const [candidatesModal, setCandidatesModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const [matchConfirm, setMatchConfirm] = useState(false);

    //State i kandidatit ideal
    const [idealCandidate, setIdealCandidate] = useState(null);

    return (
        <div>
            <multiStepContext.Provider value={{
                currentStep, setStep,
                userData, setUserData,
                finalData, setFinalData,
                isSubmited, setIsSubmited,

                //Out of context, just a shortcut
                checkModal, setCheckModal,
                checkModal1, setCheckModal1,
                checkModal2, setCheckModal2,
                checkModal3, setCheckModal3,
                checkModal4, setCheckModal4,
                checkModal5, setCheckModal5,
                candidatesModal, setCandidatesModal,
                selectedJobId, setSelectedJobId,

                //Shortcut for confirming the best candidate
                matchConfirm, setMatchConfirm,

                //Shortcut for finding the best candidate
                idealCandidate, setIdealCandidate,
            }}
            >
                {props.children}
            </multiStepContext.Provider>
        </div>
    )
}

export default StepContext;