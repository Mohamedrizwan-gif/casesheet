import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import classes from './Forgot.module.scss';

function Forgot() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const onReset = () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        if (!expression.test(String(email).toLowerCase()))
        {
            setErrorMsg('Enter a valid email address');
            setError(true);
            return false;
        }
        setErrorMsg('');
        setError(false);
        axios.post('/forgotpassword',{email: email})
        .then(res => {
            if(res.status === 200) {
                setAlertMsg(res.data.message);
            }
        })
        .catch(err => {
            if(err.response.status === 404) {
                setError(true);
                setErrorMsg('No user found');
            }
        });
    }  
    return (
        <div className="bg-auth">
            <Card className={classes.form}>
                {
                    alertMsg.length > 0 
                    ?
                    <Alert>{alertMsg}</Alert>
                    : 
                    null
                }
                <h3>Forgot your password?</h3>
                <p className={classes.note}>
                    Don't worry! Just fill in your email and we'll<br/>
                    send you a link to reset your password
                </p>
                <br/>
                <InputLabel style={{float: 'left'}}><b>EMAIL ADDRESS</b></InputLabel>
                <br/>
                <TextField
                    style={{width: '100%'}}
                    id="email"
                    variant="outlined" 
                    error={error}
                    helperText={errorMsg}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className={classes.btn_overlay}>
                    <Button className={classes.btn} variant="outlined" color="primary" onClick={onReset}>Reset password</Button>
                </div>
            </Card>
        </div>
    );
}

export default Forgot;