import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {List, ListItem, ListSubheader, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MessageHeader from './MessageHeader';


const useStyles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

class ElevateAppBar extends React.Component {
  state = {
    messagesLoading: true,
    messages: []
  }
  componentDidMount() {
    if (this.props.chat) {
      this.addListeners(this.props.chat.id);
    }
  }

  addListeners = chatId => {
    this.addMessageListener(chatId);
  }

  addMessageListener = chatId => {
    let loadedMessages = [];
    console.log("Ading listenre");
    this.props.messageRef.child(chatId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
      
        <ElevationScroll {...this.props}>
          <MessageHeader chat={this.props.chat}/>
        </ElevationScroll>
        
        <Container style={{height: '77vh', maxHeight: '77vh', margin: 1, padding: 0}}>
          <List className={classes.root} subheader={<li />}>
            {this.state.messages.map((message) => (
              <h1>{message.content}</h1>
            ))}
          </List>
        </Container>
      </React.Fragment>
    );
  }
  
}


export default withStyles(useStyles)(ElevateAppBar);