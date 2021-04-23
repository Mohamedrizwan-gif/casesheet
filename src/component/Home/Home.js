import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import Spinner from '../UI/Spinner/Spinner';
import Redirect from '../../utililty/Redirect';
import './Home.scss';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const history = useHistory();

  const onMoreInfo = (id) => {
    setOpen(true);
    sessionStorage.setItem('more_detail_id', JSON.stringify(id));
    history.push('/view_details');
  }

  return (
    <>
      <TableRow hover className={`${classes.root} table-data`}>
        <TableCell component="th" scope="row" onClick={() => onMoreInfo(row._id)}>
          {row.patient.name}
        </TableCell>
        <TableCell onClick={() => onMoreInfo(row._id)}>
          {row.patient.age}
        </TableCell>
        <TableCell onClick={() => onMoreInfo(row._id)}>
          {row.patient.gender}
        </TableCell>
        <TableCell onClick={() => onMoreInfo(row._id)}>
          {row.patient.dob}
        </TableCell>
        <TableCell onClick={() => onMoreInfo(row._id)}>
          {row.patient.phone_no}
        </TableCell>
      </TableRow>
    </>
  );
}

function Home() {
  const history = useHistory();
  const record = useSelector(state => state.records);
  const fetched = useSelector(state => state.isFetched);

  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      }
  }));

  const classes = useStyles();
         
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
        
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    localStorage.removeItem('cs_tn');
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <Redirect/>
      <AppBar position="static">
        <Toolbar>
          <IconButton title="Add Patient Details">
            <Link to="/patiententry">
              <AddCircleOutlinedIcon/>
            </Link>
            </IconButton>
            <Typography style={{textAlign:'center'}} variant="h6" className={classes.title}>
              Patient Details
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
            </div>
                  </Toolbar>
              </AppBar>
              {
                !fetched
                ?
                <div className={'pos-center'}>
                  <Spinner size={90}/>
                </div>
                :
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Phone No</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    record.length === 0 
                    ?
                    <TableRow> 
                      <TableCell/>
                      <TableCell/>
                      <TableCell style={{textAlign:'center'}}>No Record Found</TableCell>
                      <TableCell/>
                      <TableCell/>
                    </TableRow>
                    :
                    record.map(row => (
                      <Row key={row._id} row={row}/>
                    ))
                    }
                    </TableBody>
                  </Table>
                </TableContainer>
              }
          </div>
      );
};

export default Home;