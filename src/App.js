import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Home from './component/Home/Home';
import Login from './component/Authentication/Login/Login';
import Signup from './component/Authentication/Signup/Signup';
import Forgot from './component/Authentication/Forgot/Forgot';
import Reset from './component/Authentication/Reset/Reset';
import Patient from './component/Records/Patient/Patient';
import Details from './component/Details/Details';
import Examination from './component/Records/Examinations/Examination';
import Diagnosis from './component/Records/Diagnosis/Diagnosis';
import { postRecords, dataFetched, failFetched } from './store/action';
import './App.css';

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const getPatientDetials = () => {
    const token = localStorage.getItem('cs_tn');
    dispatch(failFetched());
    axios.get('/patient_details/get',{
      headers: {
        'Authorization': `token ${token}`
      }
    })
    .then(res => {
      if(res.data.response) {
        dispatch(postRecords(res.data.response));
        dispatch(dataFetched());
      }
      else {
        dispatch(postRecords([]));
      }
    })
    .catch(err => {
      if(err.response.status === 401 && err.response.data.message === 'jwt expired') {
        localStorage.removeItem('cs_tn');
        history.push('/login'); 
      }
      if(err.response.status === 404) {
        dispatch(postRecords([]));
        dispatch(dataFetched());
      }
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('cs_tn');
    if((token !== null || undefined)) {
      getPatientDetials();
    }
  },[]);

  useEffect(() => {
    const token = localStorage.getItem('cs_tn');
    if(location.pathname === "/" && token !== null || undefined) {
      getPatientDetials();
    }
  },[location.pathname]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/> 
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/forgotpassword" component={Forgot}/>
        <Route path="/resetpassword/:token" component={Reset}/>
        <Route path="/patiententry" component={Patient}/> 
        <Route path="/view_details" component={Details}/> 
        <Route path="/examinations" component={Examination}/>
        <Route path="/diagnosis" component={Diagnosis}/>
      </Switch>
    </div>
  );
};

export default App;