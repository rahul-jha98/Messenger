import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import ScrollableMessages from './ScrollableMessages';
import MessageForm from './MessageForm';


class Messages extends React.Component {
    render() {
        return (
            <Paper elevation={2} style={{height: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                <ScrollableMessages />

                <MessageForm />
            </Paper>
        )
    }
}

export default Messages;