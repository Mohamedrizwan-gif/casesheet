import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner(props) {
    return (
        <>
            <CircularProgress style={{color:'white'}} size={props.size} />
        </>
    )
}

export default Spinner;