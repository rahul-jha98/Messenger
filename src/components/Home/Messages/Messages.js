import React from 'react';
import {Paper, Typography} from '@material-ui/core';

class Messages extends React.Component {
    render() {
        return (
            <Paper elevation={2} style={{height: '100%'}}>
                <Typography variant='h6'>
                    Messaging
                </Typography>
            </Paper>
        )
    }
}

export default Messages;