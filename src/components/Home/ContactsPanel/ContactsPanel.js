import React from 'react';
import {connect} from 'react-redux';
import {setCurrentChat} from '../../../actions';

import {Paper, Typography, Avatar, CardHeader, IconButton, CardActionArea,
Menu} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CreateGroupDialog from './CreateGroup';
import firebase from '../../../firebase';

class ContactsPanel extends React.Component {
    state = {
        anchorEl: null,
        groupsRef: firebase.database().ref('groups'),
        groups: []
    }

    setAnchorEl = (val) => {
        this.setState({anchorEl: val});
    }

    handleMenu = (event) => {
        this.setAnchorEl(event.currentTarget);
    };

    handleClose = (id) => (event) => {
        this.setAnchorEl(null);
        if (id === 3) {
            
        } else if (id === 2) {
            
        }
    };

    setInState = (name, val) => {
        const state = this.state;
        this.setState({[name]: val})
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.state.groupsRef.off();
    }

    addListeners = () => {
        let loadedGroups = []

        this.state.groupsRef.on('child_added', snap => {
            loadedGroups.push(snap.val());
            this.setInState('groups', loadedGroups); 
        });

        console.log(loadedGroups);
    }

    changeActiveChat = group => {
        this.props.setCurrentChat(group);
    }

    displayGroups = groups => {
        
        return groups.map(group => (
            <CardActionArea key={group.id}>
                <CardHeader
                    onClick={() => this.changeActiveChat(group)}
                    avatar={    
                    <Avatar aria-label="recipe"/>
                    }
                    title={group.name}
                    subheader={group.description}
                />
            </CardActionArea>
        ))
    }

    render() {
        const user = this.props.currentUser;
    
        return (
            <Paper elevation={2} style={{height: '100%'}}>
                <div >
                    {user ? 
                        <CardHeader
                            avatar={    
                            <Avatar aria-label="recipe" src={user.photoURL}/>
                            }
                            action={
                                <IconButton aria-label="settings" 
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}>
                                  <MoreVertIcon/>
                                </IconButton>
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

                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.anchorEl}
                    onClose={this.handleClose(0)}>

                    <CreateGroupDialog closeDialog = {this.handleClose(0)}
                        currentUser ={user}/>         
                    
                </Menu>
                <br/>
                <Typography variant='h6'>
                    Your Chats
                </Typography>

                {this.displayGroups(this.state.groups)}
            </Paper>
        )
    }
}


export default connect(null, {setCurrentChat})(ContactsPanel);