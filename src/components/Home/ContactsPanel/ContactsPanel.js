import React from 'react';
import {Paper, Typography, Avatar, CardHeader} from '@material-ui/core';

class ContactsPanel extends React.Component {
    render() {
        const user = this.props.currentUser;
    
        return (
            <Paper elevation={2} style={{height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {user ? 
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" src={user.photoURL}/>
                            }
                            title={user.displayName}
                            subheader={user.email}
                        />
                        : 
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" >
                                R
                            </Avatar>
                            }
                            title="Not Signed In"
                            subheader="...."
                        />
                    }                    
                </div>
                <br/>
                <Typography variant='h6'>
                    Your Chats
                </Typography>
            </Paper>
        )
    }
}


export default ContactsPanel;