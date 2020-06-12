import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';

import firebase from '../../../firebase';

const useStyles = (theme) => ({
    margin: {
        marginTop: theme.spacing(1),
    },
  });


class CreateGroupDialog extends React.Component {

  state = {
    open: false,
    name: '',
    description: '',
    nameError: '',
    descriptionError: '',
    groupsRef: firebase.database().ref('groups')
  }

  setOpen = (val) => {
    this.setState({ open: val});
  }
  
  resetErrors = async () => {
    await this.setState({nameError: '',descriptionError: ''});
  }

  handleChange = (prop) => (event) => {
    this.setState({[prop]: event.target.value });
  };

  setMessage = (name, message) => {
    this.setState({ [name]: message});
  }

  isFormValid = () => {
    let val = true;
    
    if (this.state.name.length === 0) {
        this.setMessage('nameError', "Name of group cannot be empty");
        val = false;
    } 
    else if (this.state.description.length === 0) {
        this.setMessage('descriptionError', "Description cannot be empty");
        val = false;
    } 

    return val;
  }
  
  handleClickOpen = () => {
    this.props.closeDialog();
    this.setOpen(true);
  };

  handleSubmit = () => {
    this.resetErrors().then(() => {
      if (this.isFormValid()) {
        this.addChannel();
      }
    });
  }

  addChannel = () => {
    const {groupsRef, name, description} = this.state;

    const key = groupsRef.push().key;
    const user = this.props.currentUser;

    const group = {
      id: key,
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        photoUrl: user.photoURL
      }
    };

    groupsRef
      .child(key)
      .update(group)
      .then(() => {
        this.setOpen(false);
      })
  }

  handleClose = (id) => () => {
    if (id === 1) {
      this.handleSubmit();
    } else {
      this.setOpen(false);
    }
    
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button aria-label="Create Group" onClick={this.handleClickOpen} startIcon={<GroupAddTwoToneIcon/>}
          style={{paddingLeft:12, paddingRight: 12}}>
          Create Group
        </Button>
        <Dialog
          
          open={this.state.open}
          // onClose={handleClose}
          style={{padding: 10}}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Create New Group"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter details to create a new Group.
            </DialogContentText>
  
            <TextField id="name" label="Name" variant="filled" 
              fullWidth className={classes.margin}
              onChange={this.handleChange('name')}
              error = {this.state.nameError.length > 0}
              helperText = {this.state.nameError}/>

            <TextField id="desc" 
              label="Description" variant="filled" 
              fullWidth className={classes.margin}
              onChange={this.handleChange('description')}
              error = {this.state.descriptionError.length > 0}
              helperText = {this.state.descriptionError}/>
  
            
          </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={this.handleClose(0)} color="secondary">
                  Cancel
              </Button>
              <Button onClick={this.handleClose(1)} color="secondary" variant="contained" autoFocus startIcon={<GroupAddTwoToneIcon/>}
                  style= {{marginRight: 16}}>
                  Create
              </Button>
            </DialogActions>
          
        </Dialog>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateGroupDialog)