import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Avatar from '../../../assets/Images/Avatar.png';
import Card from '@material-ui/core/Card';

import classes from './Login.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [errorEmail, setErroremail] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');
  const [password, setPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [errorPwd, setErrorPwd] = useState(false);
  const [values, setValues] = useState({
    showPassword: false
  });
  const history = useHistory();
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLogin = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    if (!expression.test(String(email).toLowerCase()))
    {
      setEmailMsg('Enter a valid email address');
      setErroremail(true);
      return false;
    }
    // if(email.length < 3) {
    //   setEmailMsg('Please fill out these field');
    //   setErroremail(true);
    //   return false;
    // }
    else {
      setEmailMsg('');
      setErroremail(false);
    }
    // if(password.length < 3) {
    //   setPwdMsg('Please fill out these field');
    //   setErrorPwd(true);
    //   return false;
    // }
    // else {
    //   setPwdMsg('');
    //   setErrorPwd(false);
    // }
    axios.post('/login',{
      email: email,
      password: password
    })
    .then(response => {
      if(response.status === 200) {
        localStorage.setItem('cs_tn', response.data.token);
        history.push('/');
      }
    })
    .catch(err => {
      if(err.response.status === 403) {
        setPwdMsg('Password is incorrect');;
        setErrorPwd(true);
      }
      if(err.response.status === 404) {
        setEmailMsg('No user found');
        setErroremail(true);    
      }
    });
  }

  return(
    <div className="bg-auth">
        <Card className="form">
          <h2>Login</h2>
          <form>
            <div className="imgcontainer">
              <img className={classes.imgcontainer} src={Avatar} alt="wear mask" />
            </div>
            <div className="container">
              <div className={classes.username}>
                <TextField 
                  type="email"
                  className={classes.input} 
                  label="Enter Your Email"
                  value={email}
                  error={errorEmail}
                  helperText={emailMsg}
                  onChange={e => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }} 
                  required
                />
              </div>
              <div className={classes.password}>
                <TextField 
                  className={classes.input} 
                  label="Enter Your Password" 
                  type={values.showPassword ? 'text':'password'} 
                  value={password}
                  error={errorPwd}
                  helperText={pwdMsg}
                  onChange={e => setPassword(e.target.value)}
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
                  required
                />
                <div>
                  <Link to="/forgotpassword" className={classes.fpwd}>Forgot Password</Link>
                </div>
              </div>
              <div className={classes.btn_login}>
                <div className={classes.btn_reg}>
                  <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
                </div>
                <div className={classes.btn_reg}>
                  <Button variant="contained" style={{textDecoration:'none'}}>
                    <Link to="/signup">Signup</Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </Card>
    </div>
  );
}

export default Login;