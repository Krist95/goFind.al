import React, { useContext } from 'react';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepContext } from '../../../store/step-context';

import GenInfo from './GenInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Languages from './Languages';
import CVModal from './CVModal';
import './Resume.css';

const Resume = () => {
  const { currentStep, isSubmited } = useContext(multiStepContext);
  function showStep(step) {
    switch (step) {
      case 1:
        return <GenInfo />;
      case 2:
        return <Education />
      case 3:
        return <Experience />
      case 4:
        return <Skills />
      case 5:
        return <Languages />
      default:
    };
  }
  function showHeader(step) {
    switch (step) {
      case 1:
        return "Të dhëna të përgjithshme";
      case 2:
        return "Edukimi im";
      case 3:
        return "Eksperienca ime";
      case 4:
        return "Aftësitë e mia";
      case 5:
        return "Gjuhët e huaja";
      default:
        return "";
    }
  }

  return (
    <div className="Resume">
      <div className="Resume-header">
        <h3 style={{ color: '###' }}>{showHeader(currentStep)}</h3>
      </div>
      <div className="center-stepper">
        <Stepper style={{ width: '90%', backgroundColor: '#dce0d7', borderRadius: '15px' }} activeStep={currentStep - 1} orientation="horizontal">
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>
      {showStep(currentStep)}
      {isSubmited && <CVModal />}
    </div >

  );
};

export default Resume;