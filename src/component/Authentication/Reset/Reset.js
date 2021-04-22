import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';

import classes from './Reset.module.scss';

function Reset(props) {
    const [alertMsg, setAlertMsg] = useState('');
    const [password, setPassword] =useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };   
    
    const handleChange = () => {
        if(password !== rePassword) {
            setErrorState(true);
            setErrorMessage('Password not match');
            return false;
        }
        if(password.length < 6) {
            setErrorState(true);
            setErrorMessage('Password must be atleast 6 character');
            return false;
        }
        const token = props.match.params.token;
        if(token) {
            axios.post(`/resetpassword/${token}`,{password:password})
            .then(res => {
                if(res.status === 200) {
                    setAlertMsg(res.data.message);
                    setTimeout(() => props.history.push('/login') ,1000);
                }
            })
            .catch(err => {
                if(err.response.status === 422) {
                    setAlertMsg('Invalid token or time expired');
                }
            });
        }
    }
    
    return (
        <div className="bg-auth">
            <Card className={classes.form}>
                {alertMsg.length > 0 ?
                <Alert severity="warning">{alertMsg}</Alert>
                : 
                null            
                }
                <h3>Change your password</h3>
                <div>
                    <InputLabel className={classes.fl_left} htmlFor="pwd">New Password</InputLabel>
                </div>
                <br/>
                <TextField
                    id="pwd"
                    className={classes.input}
                    type={values.showPassword ? 'text':'password'} 
                    variant="outlined"
                    error={errorState}
                    helperText={errorMessage}
                    InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }} 
                    onChange={e => setPassword(e.target.value)}
                />
                <br/>
                <br/>
                <div>
                    <InputLabel className={classes.fl_left} htmlFor="repwd">Reenter password</InputLabel>
                </div>
                <br/>
                <TextField
                    id="repwd"
                    className={classes.input}
                    type={values.showPassword ? 'text':'password'} 
                    variant="outlined" 
                    onChange={e => setRePassword(e.target.value)}
                />
                <br/>
                <br/>
                <div className={classes.btn_overlay}>
                    <Button onClick={handleChange} className={classes.btn} variant="contained" color="primary">Change Password</Button>
                </div>
            </Card>
        </div>
    )
}

export default Reset;