import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

import { postDetails } from '../../../store/action';
import Redirect from '../../../utililty/Redirect';
import classes from './Patient.module.scss';

function Patient() {
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bloodgroup, setBloodGroup] = useState('');
    const [dob, setDOB] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cheifComplaint, setCheifComplaint] = useState('');
    const [associateComplaint, setAssociateComplaint] = useState('');
    const [pasthistory, setPastHistory] = useState('');
    const [medicalhistory, setMedicalHistory] = useState('');
    const [familyhistory, setFamilyHistory] = useState('');
    const [food, setFood] = useState('');
    const [urine, setUrine] = useState('');
    const [stool, setStool] = useState('');
    const [sleep, setSleep] = useState('');
    const [others, setOthers] = useState('');
    const [reqfield1, setReqField1] = useState(false);
    const [reqfield2, setReqField2] = useState(false);
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');

    const history = useHistory();
    const state = useSelector(state => state.patient_details);
    const dispatch = useDispatch();

    const handleReqField1 = (event) => {
        setName(event.target.value);
        if(event.target.value.length > 2) {
            setReqField1(false);
            setMessage1('');
        }
    }

    const handleReqField2 = (event) => {
        setAge(event.target.value);
        if(event.target.value.length > 0) {
            setReqField2(false);
            setMessage2('');
        }
    }

    const sendPayload = () => {
        const payload = {
            name: name,
            age: age,
            gender: gender,
            bloodgroup: bloodgroup,
            dob: dob,
            occupation: occupation,
            address: address,
            phone_no: phoneNumber,
            cheif_complaint: cheifComplaint,
            associate_complaint: associateComplaint, 
            past_history: pasthistory,
            medical_history: medicalhistory,
            family_history: familyhistory,
            food: food,
            urine: urine,
            stool: stool,
            sleep: sleep,
            others: others
        };
        dispatch(postDetails(payload));
    }

    const handleSubmitButton = () => {
        sendPayload();
        history.push('/examinations');
    }

    const handleNext = () => {
        if(name.length <= 0) {
            setReqField1(true);
            setMessage1('This field is required');
            return;
        }
        if(age.length <= 0) {
            setReqField2(true);
            setMessage2('This field is required');
            return;
        }
        sendPayload();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };   

    useEffect(()=>{
        if(state.name.trim().length !== 0) {
            setName(state.name);
        }
        if(state.age !== null) {
            setAge(state.age);
        }
        if(state.gender.trim().length !== 0) {
            setGender(state.gender);
        }
        if(state.bloodgroup.trim().length !== 0) {
            setBloodGroup(state.bloodgroup);
        }
        if(state.dob.trim().length !== 0) {
            setDOB(state.dob);
        }
        if(state.occupation.trim().length !== 0) {
            setOccupation(state.occupation);
        }
        if(state.address.trim().length !== 0) {
            setAddress(state.address);
        }
        if(state.phone_no !== null) {
            setPhoneNumber(state.phone_no);
        }
        if(state.cheif_complaint.trim().length !== 0) {
            setCheifComplaint(state.cheif_complaint);
        }
        if(state.associate_complaint.trim().length !== 0) {
            setAssociateComplaint(state.associate_complaint);
        }
        if(state.past_history.trim().length !== 0) {
            setPastHistory(state.past_history);
        }
        if(state.medical_history.trim().length !== 0) {
            setMedicalHistory(state.medical_history);
        }
        if(state.family_history.trim().length !== 0) {
            setFamilyHistory(state.family_history);
        }
        if(state.food.trim().length !== 0) {
            setFood(state.food);
        }
        if(state.urine.trim().length !== 0) {
            setUrine(state.urine);
        }
        if(state.stool.trim().length !== 0) {
            setStool(state.stool);
        }
        if(state.sleep.trim().length !== 0) {
            setSleep(state.sleep);
        }
        if(state.others.trim().length !== 0) {
            setOthers(state.others);
        }
    },[]);

    return(
        <div> 
        <Redirect/>
        <Stepper activeStep={activeStep} orientation="vertical">
            <Step key='Patient Details'>
                <StepLabel>
                    <b>Patient Details</b>
                </StepLabel>
                <StepContent>
                <div className={classes.patient}>
                    <div>
                        <div>
                            <TextField
                                className={classes.pd_input} 
                                error={reqfield1}
                                helperText={message1}
                                label="Name" 
                                value={name} 
                                onChange={e => handleReqField1(e)}
                                required
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                className={classes.pd_input}
                                error={reqfield2}
                                helperText={message2} 
                                label="Age" 
                                value={age} 
                                onChange={e => handleReqField2(e)} 
                                required
                            />
                        </div>
                        <br/>
                        <div>
                            <FormControl className={classes.pd_input} component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup value={gender} aria-label="gender" name="gender1" onChange={(e) => setGender(e.target.value)}>
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <br/>
                        <div>
                            <FormControl className={classes.pd_input} variant="outlined">
                                <InputLabel id="bloodgroup">Blood Group</InputLabel>
                                <Select
                                    labelId="bloodgroup"
                                    defaultValue=""
                                    value={bloodgroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                >
                                    <MenuItem value={'O+ positive'}>O+ positive</MenuItem>
                                    <MenuItem value={'O- negative'}>O- negative</MenuItem>
                                    <MenuItem value={'A+ positive'}>A+ positive</MenuItem>
                                    <MenuItem value={'A- negative'}>A- negative</MenuItem>
                                    <MenuItem value={'B+ positive'}>B+ positive</MenuItem>
                                    <MenuItem value={'B- negative'}>B- negative</MenuItem>
                                    <MenuItem value={'AB+ positive'}>AB+ positive</MenuItem>
                                    <MenuItem value={'AB- negative'}>AB- negative</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <div>
                            <TextField 
                                className={classes.pd_input}
                                label="DOB" 
                                type="date"
                                value={dob}
                                onChange={(e) => setDOB(e.target.value)}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                className={classes.pd_input}
                                label="Occupation" 
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                className={classes.pd_input}
                                id="address" 
                                label="Address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField 
                                className={classes.pd_input}
                                type="number" 
                                id="phno" 
                                label="Phone number" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                </div>
                </StepContent>
            </Step>
            <Step key='Complaints'>
                <StepLabel>
                    <b>Complaints</b>
                </StepLabel>
                <StepContent>
                <div>
                    <TextField 
                        className={classes.c_input}
                        variant="outlined" 
                        label="Chief Complaint"
                        value={cheifComplaint}
                        onChange={(e) => setCheifComplaint(e.target.value)} 
                        multiline
                    />
                    <br/>
                    <br/>
                    <TextField 
                        className={classes.c_input}
                        variant="outlined" 
                        label="Associate Complaint"
                        value={associateComplaint}
                        onChange={(e) => setAssociateComplaint(e.target.value)} 
                        multiline
                    />
                    <div>
                        <Button className={classes.btn} variant="contained" onClick={handleBack}>Back</Button>
                        <Button className={classes.btn} variant="contained" color="primary" onClick={handleNext}>Next</Button>
                    </div>
                </div>
                </StepContent>
            </Step>
            <Step key='History'>
                <StepLabel><b>History</b></StepLabel>
                <StepContent>
                <div>
                    <div>
                        <TextField 
                            className={classes.h_input}
                            variant="outlined" 
                            label="Past History"
                            value={pasthistory} 
                            onChange={(e) => setPastHistory(e.target.value)}
                            multiline
                        />
                    </div>
                    <br/>
                    <div>
                        <TextField  
                            className={classes.h_input}
                            variant="outlined" 
                            label="Medical History" 
                            value={medicalhistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            multiline
                        />
                    </div>  
                    <br/>
                    <div>
                        <TextField 
                            className={classes.h_input}
                            variant="outlined" 
                            label="Family History" 
                            value={familyhistory}
                            onChange={(e) => setFamilyHistory(e.target.value)}
                            multiline
                        />
                    </div>
                <h4 style={{textAlign:'center'}}><b>Personal history</b></h4>
                  <div>
                     <TextField 
                        id="food" 
                        label="Food" 
                        className="personal" 
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                    />
                  </div>
                     <br/>
                  <div>
                     <TextField 
                        id="urine" 
                        label="Urine" 
                        className="personal"
                        value={urine}
                        onChange={(e) => setUrine(e.target.value)}
                     />
                  </div>
                     <br/>
                  <div>
                     <TextField 
                        id="stool" 
                        label="Stool" 
                        className="personal"
                        value={stool}
                        onChange={(e) => setStool(e.target.value)}
                     />
                  </div>
                     <br/>
                  <div>
                     <TextField 
                        id="sleep" 
                        label="Sleep" 
                        className="personal"
                        value={sleep}
                        onChange={(e) => setSleep(e.target.value)}
                     />
                  </div>
                     <br/>
                  <div>
                  <TextField 
                    id="others" 
                    label="Others" 
                    className="personal"
                    value={others}
                    onChange={(e) => setOthers(e.target.value)}
                  />
                  </div>
                     <br/>
                  <div>
                    <Button className={classes.btn} variant="contained" onClick={handleBack}>Back</Button>
                    <Button className={classes.btn} variant="contained" color="primary" onClick={handleSubmitButton}>Next</Button>
                  </div>
                </div>
                </StepContent>
            </Step>
        </Stepper>
    </div>
    );
}

export default Patient;