import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { deleteRecord } from '../../store/action';
import Spinner from '../UI/Spinner/Spinner';
import Redirect from '../../utililty/Redirect';
import classes from './Details.module.scss';

function More_details() {
    const [row, setRow] = useState(null);
    const [spin, setSpin] = useState(false);
    const history = useHistory();
    const state = useSelector(state => state.records);
    const dispatch = useDispatch();

    const onDelete = (id) => {
        dispatch(deleteRecord(id));
        setSpin(true);
        const token = localStorage.getItem('cs_tn');
        axios.delete('/patient_details/delete/' + id,{
          headers: {
            'Authorization': `token ${token}`
          }
        })
        .then(res => {
          if(res.status === 200){
            setSpin(false);
            history.push('/');
          }
        })
        .catch(err => {
            setSpin(false);
            console.log(err);
        });
      }

    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem('more_detail_id'));
        const record = state.find(rec => rec._id === id );
        setRow(record);
    },[]);

    return (
        <div>
            <Redirect/>
            <br/>
            <TableContainer className={classes.table_container} component={Paper}>
               <Table  aria-label="simple table">
                   <TableBody>
                       {row ? 
                            <>
                                <TableRow>
                                    <TableCell>
                                        <strong>Address</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.patient.address ? row.patient.address : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Blood Group</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.patient.bloodgroup ? row.patient.bloodgroup : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Occupation</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.patient.occupation ? row.patient.occupation : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Chief Complaint</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.complaint.cheif_complaint ? row.complaint.cheif_complaint : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Associate Complaint</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.complaint.associate_complaint ? row.complaint.associate_complaint : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Past History</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.history.past_history ? row.history.past_history : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Medical History</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.history.medical_history ? row.history.medical_history : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Family History</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.history.family_history ? row.history.family_history : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Food</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.food ? row.test.food : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Urine</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.urine ? row.test.urine : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Stool</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.stool ? row.test.stool : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Sleep</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.sleep ? row.test.sleep : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Others</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.others ? row.test.others : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>BP</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.bp ? row.test.bp : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>PULSE</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.pulse ? row.test.pulse : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>RS</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.rs ? row.test.rs : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>CVS</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.cvs ? row.test.cvs : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>TEMP</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.temp ? row.test.temp : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Systematic Investigation</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.systematic_examination ? row.test.systematic_examination : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Investigation</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.investigation ? row.test.investigation : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Diagnosis</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.diagnosis ? row.test.diagnosis : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Differential Diagnosis</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                    {
                                    row.test.differential_diagnosis ? row.test.differential_diagnosis : '---'
                                    }
                                    </TableCell>
                                </TableRow>
                            </>
                            :
                            null
                       }
                   </TableBody>
               </Table>
            </TableContainer> 
            <br/>
            <div>
                <Button 
                    className={classes.btn} 
                    variant="contained"
                    onClick={() => history.push('/')}
                >
                    Back
                </Button>
                <Button 
                    className={classes.btn} 
                    color="secondary" 
                    variant="contained"
                    onClick={() => onDelete(row._id)}
                >
                    Delete
                    {spin ? 
                    <Spinner 
                        style={{marginLeft:'5px', color:'white'}} 
                        size={20}
                    />
                    :
                    null
                    }
                </Button>
            </div>
        </div>
    )
}

export default More_details;