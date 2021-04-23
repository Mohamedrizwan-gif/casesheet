import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { postDetails, dataFetched, failFetched } from '../../../store/action';
import Redirect from '../../../utililty/Redirect';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Diagnosis.module.scss';

function Diagnosis() {
    const [activeStep, setActiveStep] = useState(0);
    const [diagnosis, setDiagnosis] = useState('');
    const [differentialdiagnosis, setDifferentialDiagnosis] = useState ('');
    const [spin, setSpin] = useState(false);
    const history = useHistory();
    const details = useSelector(state => state.patient_details);
    const dispatch = useDispatch();

    const sendPayload = () => {
        const payload = {
            diagnosis,
            differentialdiagnosis
        };
        dispatch(postDetails(payload));
    }

    const resetPayload = () => {
        const payload = {
            name: '',
            age: null,
            gender: '',
            dob: '',
            bloodgroup: '',
            occupation: '',
            address: '',
            phone_no: null,
            cheif_complaint: '',
            associate_complaint: '',
            past_history: '',
            medical_history: '',
            family_history: '',
            food: '',
            urine: '',
            stool: '',
            sleep: '',
            others: '',
            bp: '',
            pulse: '',
            rs: '',
            cvs: '',
            temp: '',
            systematicexamination: '',
            investigation: '',
            diagnosis: '',
            differentialdiagnosis: ''
        }
        dispatch(postDetails(payload));
    }

    const handlefirstBack = ()=> {
        history.push("/examinations")
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleNext = () => {
        sendPayload();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSubmit = () => {
        setSpin(true);
        dispatch(failFetched());
        const token = localStorage.getItem('cs_tn');
        sendPayload();
        axios.post('/patient_details/post', details, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(res => {
            setSpin(false);
            dispatch(dataFetched());
            resetPayload();
            history.push('/');
        })
        .catch(err => {
            setSpin(false);
            dispatch(dataFetched());
            resetPayload();
        });
    }

    useEffect(() => {
        if(differentialdiagnosis.length > 0) {
            sendPayload();   
        }
    },[differentialdiagnosis]);

    useEffect(() => {
        if(details.diagnosis.trim().length !== 0) {
            setDiagnosis(details.diagnosis);
        }
        if(details.differentialdiagnosis.trim().length !== 0) {
            setDifferentialDiagnosis(details.differentialdiagnosis);
        }
    }, []);

    return(
        <div>
            <Redirect/>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key="Diagnosis" >
                    <StepLabel> Diagnosis </StepLabel>
                        <StepContent>
                            <div>
                                <TextField 
                                    className={classes.input}
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)} 
                                    variant="outlined" label="Diagnosis" 
                                    multiline
                                />
                            </div>
                            <br/>
                            <div>
                                <Button 
                                    className={classes.btn}
                                    variant="contained" 
                                    onClick={handlefirstBack}
                                >
                                    Back
                                </Button>
                                <Button 
                                    className={classes.btn}
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            </div>
                        </StepContent>
                </Step>
                <Step key="Differtial">
                    <StepLabel>  Differential Diagnosis </StepLabel>
                        <StepContent>
                            <div>
                                <TextField 
                                    className={classes.input}
                                    label="Differential Diagnosis"
                                    value={differentialdiagnosis}
                                    onChange={(e) => setDifferentialDiagnosis(e.target.value)} 
                                    variant="outlined" 
                                    multiline
                                />
                            </div>
                            <br/>
                            <div>
                                <Button 
                                    className={classes.btn} 
                                    variant="contained" 
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button 
                                    className={classes.btn} 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleSubmit}
                                >
                                    Submit{spin ? 
                                                <Spinner 
                                                    style={{marginLeft:'5px'}} 
                                                    size={20}
                                                /> 
                                                : null }
                                </Button>
                            </div>
                        </StepContent>
                </Step>
            </Stepper>
        </div>
    );
}

export default Diagnosis;