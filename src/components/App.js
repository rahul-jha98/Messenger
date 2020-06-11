import React from 'react';
import './App.css';

import LoadingScreen from './LoadingScreen';
import Home from './Home';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bg: {
    background: theme.palette.type === 'dark' ? '#373737': '#fafafa'
  }
}));

function App(props) {
  const classes = useStyles();
  return (
    <div className={"app " + classes.bg}>
      {props.isLoading ? 
        <LoadingScreen message = "Fetching your messages" />
        :
        <Home/>
      }
      
    </div>
  );
}


export default App;
