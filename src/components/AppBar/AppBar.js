import React from 'react';
import firebase from '../../firebase';

import { makeStyles } from '@material-ui/core/styles';

import {AppBar, IconButton, Toolbar, Typography, Button, Menu,
MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import MoreIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  



export default (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => (event) => {
    setAnchorEl(null);
    if (id === 3) {
      handleSignout();
    } else if (id === 2) {
      props.toggleDarkMode()
    }
  };

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out")
      })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Messenger
          </Typography>
          
          
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreIcon />
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
            onClose={handleClose(0)}
          >
            <MenuItem onClick={handleClose(2)}>Toggle Dark Mode</MenuItem> 
            {props.user ? 
              <MenuItem onClick={handleClose(3)}>Logout</MenuItem>
            :null}           
            
          </Menu>
      
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}