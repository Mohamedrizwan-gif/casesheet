import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';

import classes from './Signup.module.scss';

function Signup() {
    const [email, setEmail] = useState('');;
    const [password, setPassword] =useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [values, setValues] = useState({ showPassword: false });
    const history = useHistory();

    const handleSignup = () => {
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
        axios.post('/signup',{ name, email, password, key })
        .then(res => {
            if(res.status === 201 && res.data.token) {
                localStorage.setItem('cs_tn', res.data.token);
                history.push('/');
            }
         })
        .catch(err => {
            if(err.response.status === 409) {
                setAlertMsg(err.response.data.message);
            }
            if(err.response.status === 422) {
                setAlertMsg(err.response.data.message);
            }
            
        });
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

    const HandleLogin = ()=>{
        history.push('/login');
    }

    return (
        <div className="bg-auth">
            <Card className="form">
                {
                    alertMsg.length > 0 
                    ?
                    <Alert severity="error">{alertMsg}</Alert>
                    :
                    null
                }
                <h2>Sign Up</h2>
                <form>
                    <div>
                        <TextField 
                            className={classes.input} 
                            label="Name" 
                            value={name} 
                            onChange={e=>setName(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position='start'>
                                    < PersonIcon/>
                                </InputAdornment>
                                )
                            }} 
                            required
                        />
                    </div>
                    <div>
                        <TextField 
                            className={classes.input} 
                            label="Email" 
                            onChange={e=>setEmail(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position='start'>
                                    < EmailIcon/>
                                </InputAdornment>
                                )
                            }} 
                            required
                        />
                    </div>
                    <div>
                        <TextField 
                            className={classes.input} 
                            label="Password" 
                            error={errorState} 
                            helperText={errorMessage} 
                            type={values.showPassword ? 'text':'password'} 
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
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
                            required
                        />
                    </div>
                    <div>
                        <TextField className={classes.input} label="Re-enter Your Password" 
                        error={errorState} 
                        type={values.showPassword ? 'text':'password'}
                        onChange={e=>setRePassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField className={classes.input} label="Key" 
                        error={errorState} 
                        onChange={e=>setKey(e.target.value)}
                        />
                    </div>
                    <div className={classes.btn_reg}>
                        <Button onClick={handleSignup} color="primary" variant="contained">signup</Button>
                        <Button variant="contained"  style={{textDecoration:'none'}} onClick={HandleLogin}>login</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Signup;
