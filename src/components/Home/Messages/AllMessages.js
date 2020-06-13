import React from 'react';
import './AllMessages.css';
import Card from '@material-ui/core/Card';
import {Typography} from '@material-ui/core';


function ChatMessage(props){ 
    const rad = 8;
    let radLeft = rad;
    let radRight = rad;
    if (props.firstMessage) {
        if (props.user) {
            radRight = 1;
        } else {
            radLeft = 1;
        }
    } 
    
    return (
        <div style={{display: 'flex'}}>
            {}
            <Card {...props} style={{borderRadius: rad, borderTopLeftRadius: radLeft, borderTopRightRadius: radRight}}  variant='outlined'>
                {props.showName ? 
                    <Typography variant='body2' color='textSecondary' style={{textAlign: props.user ? 'right' : 'left'}}>{props.message.user.name}</Typography>
                    : null
                }
                <Typography variant='body1' >
                    {props.message.content}
                </Typography>
            </Card>
        </div>
        
    )
}

export default (props) => {
    // const [lastUserId, setLastUserId] = React.useState('');
    let showName = false;
    let lastUserId = false;
    return (
        props.messages.map(message => {
            {message.user.id === lastUserId ? showName= false : showName = true}
            {lastUserId = message.user.id}
            return message.user.id === props.userId ?
                <ChatMessage  className='message user-message' 
                    message={message} 
                    showName={showName} 
                    firstMessage={showName}
                    user/>
                :
                <ChatMessage  
                    className='message' 
                    message={message} 
                    showName={showName} 
                    firstMessage={showName}/>
        })
    )
}