import React from 'react';
import {connect} from 'react-redux';

import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import ContactsPanel from './ContactsPanel/ContactsPanel';
import Messages from './Messages/Messages';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    content: {
      height: '91vh',
    },
    container: {
      width: '100%',
      margin: 0
    },
    item: {
      padding: 6
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Home (props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-around" className={classes.container}>
                <Grid item xs={12} sm = {4} className={classes.content + " " + classes.item}>
                  <ContactsPanel currentUser={props.currentUser}/>
                </Grid>                
                <Grid item xs={12} sm ={8} className={classes.content + " " + classes.item}>
                  <Messages />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Home);
