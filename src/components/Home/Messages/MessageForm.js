import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {TextField, IconButton, Grid, InputBase} from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import firebase from '../../../firebase';

const useStyles = (theme) => ({
    root: {
      backgroundColor: theme.palette.type === 'dark' ? '#353535': '#e0e0e0',
      color: theme.palette.text.primary,
      alignItems: 'bottom'
    },
    icon: {
      verticalAlign: 'bottom'
    },
    centering: {
      margin: 'auto',
      width: '100%',
      height: '100%',
      padding: '8px'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
  });

class MessageForm extends React.Component {
  state = {
    message: ''
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  createMessage = () => {
    return  {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.user.uid,
        name: this.props.user.displayName,
        avatar: this.props.user.photoURL
      }
    }
    
  }
  submit = () => {
    if (this.state.message) {
      const {messageRef} = this.props;
      messageRef
        .child(this.props.chatId)
        .push()
        .set(this.createMessage())

      console.log(this.props.chatId)
    }
    this.setState({message: ''})
  }

  render() {
      const {classes} = this.props;
      return (
        <div className={classes.root}>
            <Grid container>
              <Grid item xs={11}>
              <InputBase
                  className={classes.input + ' ' + classes.centering}
                  placeholder="Type message here"
                  multiline
                  name='message'
                  value = {this.state.message}
                  onChange={this.handleChange}
                  rowsMax={4}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={this.submit}>
                  <SendTwoToneIcon className={classes.icon} fontSize='32'/>
                </IconButton>
              </Grid>
            </Grid>
        </div>
      )
  }
}

export default withStyles(useStyles)(MessageForm);