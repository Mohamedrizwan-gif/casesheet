import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { postDetails } from '../../../store/action';
import Redirect from '../../../utililty/Redirect';
import classes from './Examination.module.scss';

function Examination() {
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();
    const [bp, setBp] = useState ('');
    const [pulse, setPulse] = useState ('');
    const [rs, setRs] = useState ('');
    const [cvs, setCvs] = useState ('');
    const [temp, setTemp] = useState ('');
    const [systematicexamination, setSystematicExamination] = useState ('');
    const [investigation, setInvestigation] = useState ('');
    const state = useSelector(state => state.patient_details);
    const dispatch = useDispatch();

    const sendPayload = () => {
        const payload = {
            bp,
            pulse,
            rs,
            cvs,
            temp,
            systematicexamination,
            investigation
        };
        dispatch(postDetails(payload));
    }

    const handleSubmit = () => {
        sendPayload();
        history.push('/diagnosis');
    }

    const handleNext = () => {
        sendPayload();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlefirstBack = ()=> {
        history.push("/patiententry")
    }

    useEffect(() => {
        if(state.bp.trim().length !== 0) {
            setBp(state.bp);
        }
        if(state.pulse.trim().length !== 0) {
            setPulse(state.pulse);
        }
        if(state.rs.trim().length !== 0) {
            setRs(state.rs);
        }
        if(state.cvs.trim().length !== 0) {
            setCvs(state.cvs);
        }
        if(state.temp.trim().length !== 0) {
            setTemp(state.temp);
        }
        if(state.systematicexamination.trim().length !== 0) {
            setSystematicExamination(state.systematicexamination);
        }
        if(state.investigation.trim().length !== 0) {
            setInvestigation(state.investigation);
        }
    }, []);

    return (
        <div>
            <Redirect/>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key='Examination'>
                    <StepLabel>Examination</StepLabel>
                    <StepContent>
                        <div>
                            <TextField 
                                label="BP" 
                                value={bp}
                                onChange={(e) => setBp(e.target.value)} 
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                label="PULSE"
                                value={pulse}
                                onChange={(e) => setPulse(e.target.value)}  
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                label="RS" 
                                value={rs}
                                onChange={(e) => setRs(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField  
                                label="CVS"
                                value={cvs}
                                onChange={(e) => setCvs(e.target.value)} 
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField  
                                label="TEMP"
                                value={temp}
                                onChange={(e) => setTemp(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div>
                                <Button variant="contained" style={{margin:10}} onClick={handlefirstBack}>Back</Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                        </div>
                    </StepContent>
                </Step>
                <Step key='Systematic' >
                    <StepLabel>Systematic Examination</StepLabel>
                    <StepContent>
                        <div>
                            <TextField 
                                className={classes.input}
                                value={systematicexamination}
                                onChange={(e) => setSystematicExamination(e.target.value)}
                                variant="outlined" 
                                label="Systematic Examination" 
                                multiline 
                            />
                        </div>
                        <br/>
                        <div>
                                <Button className={classes.btn} variant="contained" onClick={handleBack}>Back</Button>
                                <Button className={classes.btn} variant="contained" color="primary" onClick={handleNext}>Next</Button>
                        </div>
                    </StepContent>
                </Step>
                <Step key='Investigation'>
                    <StepLabel>Investigation</StepLabel>
                    <StepContent>
                        <div>
                            <TextField  
                                className={classes.input}
                                value={investigation}
                                onChange={(e) => setInvestigation(e.target.value)} 
                                variant="outlined" 
                                label="Investigation"
                                multiline 
                            />
                        </div>
                        <br/>
                        <div>
                                <Button className={classes.btn} variant="contained" onClick={handleBack}>Back</Button>
                                <Button className={classes.btn} variant="contained" color="primary" onClick={handleSubmit}>Next</Button>
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
        </div>  
    )
}

export default Examination;