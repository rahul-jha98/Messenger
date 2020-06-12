import React from 'react';
import {Paper, Typography, Grid} from '@material-ui/core';
import ScrollableMessages from './ScrollableMessages';
import MessageForm from './MessageForm';
import firebase from '../../../firebase';
import MessageHeader from './MessageHeader';

class Messages extends React.Component {
    state = {
        messageRef: firebase.database().ref('messages')
    }
    render() {
        return (
            <Paper elevation={2} style={{height: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                {this.props.chat ? <ScrollableMessages chat={this.props.chat} messageRef={this.state.messageRef}/>: null}
                
            
                <MessageForm 
                    chatId = {this.props.chat ? this.props.chat.id : ''} 
                    user={this.props.user}
                    messageRef={this.state.messageRef}/>
            </Paper>
        )
    }
}

export default Messages;