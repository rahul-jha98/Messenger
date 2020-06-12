import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {TextField, IconButton, Grid, InputBase} from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';

const useStyles = (theme) => ({
    root: {
      backgroundColor: theme.palette.type === 'dark' ? '#323232': '#e0e0e0',
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
                  onChange={this.handleChange}
                  rowsMax={4}
                />
                {/* <TextField id="filled-basic" variant="filled" 
                  placeholder='Type message here'
                  multiline
                  fullWidth
                  size='small'
                  rowsMax={5}
                  className={classes.centering}/> */}
              </Grid>
              <Grid item xs={1}>
                <IconButton >
                  <SendTwoToneIcon className={classes.icon} fontSize='32'/>
                </IconButton>
              </Grid>
            </Grid>
        </div>
      )
  }
}

export default withStyles(useStyles)(MessageForm);