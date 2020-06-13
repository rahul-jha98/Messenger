import React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import {List} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MessageHeader from './MessageHeader';
import AllMessages from './AllMessages';

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
    this.setState({messages: [], messagesLoading: true});
    this.addMessageListener(chatId);
  }

  componentDidUpdate = prevProps => {
    console.log(prevProps);
    if (prevProps.chat) {
      if (this.props.chat.id !== prevProps.chat.id) {
        this.removeListeners(prevProps.chat.id);
        this.addListeners(this.props.chat.id);
      }
    }
  }

  removeListeners = chatId => {
    this.props.messageRef.child(chatId).off();
  }

  addMessageListener = chatId => {
    let loadedMessages = [];
    console.log("Ading listener");
    this.props.messageRef.child(chatId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      console.log(loadedMessages);
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
        
        <Container style={{flexGrow: 1, maxHeight: '77vh', margin: 1, padding: 0}}>
          <List className={classes.root} subheader={<li />}>
            <AllMessages messages={this.state.messages} userId={this.props.user.uid}/>
          </List>
        </Container>
      </React.Fragment>
    );
  }
  
}


export default withStyles(useStyles)(ElevateAppBar);