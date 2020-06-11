import React from 'react';
import {CircularProgress, Typography} from '@material-ui/core';

export default (props) => {
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
          <CircularProgress color='secondary'/>
          <br/>
          <Typography variant = 'body1' >{props.message}</Typography>
        </div>
    )
}