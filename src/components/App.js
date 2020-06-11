import React from 'react';
import './App.css';
import {CircularProgress, Typography} from '@material-ui/core';


function App(props) {
  console.log(props.isLoading)
  return (
    <div className="app">

      {props.isLoading ? 
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
          <CircularProgress color='secondary'/>
          <Typography variant = 'h5' >Fetching your messages</Typography>
        </div>
        :
        <h1>Your messages</h1>
      }
      
    </div>
  );
}

export default App;
