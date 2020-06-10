import React from 'react';

import {Grid, Typography, IconButton, OutlinedInput, InputLabel, 
InputAdornment, FormControl, TextField, Button, Paper,
CircularProgress, FormHelperText} from '@material-ui/core';

import {Visibility, VisibilityOff} from '@material-ui/icons';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../logo.svg';

import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
      width: '40ch',
    },
  });

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            showPassword: false,
            
            nameError: '',
            emailError: '',
            passwordError: '',
            loading: false,

            usersRef: firebase.database().ref('users')
        }
    }

    handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword });
    };

    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };

    setMessage = (name, message) => {
        this.setState({...this.state, [name]: message});
    }

    resetErrors = async () => {
        await this.setState({...this.state, nameError: '', emailError: '', passwordError: ''});
    }
    isFormValid = () => {
        let val = true;
        if (this.state.name.length === 0) {
            this.setMessage('nameError', "Name field cannot be empty");
            // this.showSnackbar("Name field cannot be empty");
            val = false;
        } 
        else if (this.state.email.length === 0) {

            this.setMessage('emailError', "Email field cannot be empty");
            val = false;
        } 
        else if (this.state.password.length < 6) {
            this.setMessage('passwordError', "Password must have atleast 6 characters");
            val = false;
        } 

        return val;
    }

    handleSubmit = () => {
        this.resetErrors().then(() => {
            if (this.isFormValid()) {
                this.setState({...this.state, loading: true});
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(createdUser => {
                        console.log(createdUser);
                        createdUser.user.updateProfile({
                            displayName: this.state.name,
                            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                        })
                        .then(() => {
                            this.saveUser(createdUser)
                                .then(() => {
                                    console.log("User saved!!")
                                    this.setState({...this.state, loading: false});
                                })
                                .catch(error => {
                                    console.error(error);
                                })                          
                        })
                        .catch(err => { 
                            this.setState({...this.state, loading: false});
                        })
                        
                    })
                    .catch(err => {
                        console.error(err);
                        
                        if (err.message.toLowerCase().includes('email')) {
                            this.setMessage('emailError', err.message);
                        } else if (err.message.toLowerCase().includes('password')) {
                            this.setMessage('passwordError', err.message);
                        }
                        this.setState({...this.state, loading: false});
                    })
            } else {
    
            }
        });
        
    }


    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            email: createdUser.user.email
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root + " app"}>
                <Grid container justify='center'>
                    <Grid item  style={{maxWidth: 550, textAlign: 'center'}}>
                       <Paper elevation={2} style={{padding: 30, borderRadius: 10}}>
                            <img src={logo} alt="logo" style={{margin:'auto'}} width='50%' height='30%'/>
                            <Typography variant = 'h5' >Register for Messenger</Typography>
                            <br/>

                            <TextField className={clsx(classes.margin, classes.textField)} 
                                error = {this.state.nameError.length > 0}
                                helperText = {this.state.nameError}
                                id="name" label="Name" variant="outlined" 
                                value = {this.state.name}
                                onChange = {this.handleChange('name')}/>
                            <br/>
                            <TextField className={clsx(classes.margin, classes.textField)} 
                                error = {this.state.emailError.length > 0}
                                helperText = {this.state.emailError}
                                id="mail" label="E-Mail" variant="outlined" 
                                value={this.state.email}
                                onChange = {this.handleChange('email')}/>
                            <br/>
                            <FormControl error = {this.state.passwordError.length > 0} className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        edge="end"
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                 <FormHelperText id="outlined-adornment-password">{this.state.passwordError}</FormHelperText>
                            </FormControl>
                            <br/>
                            {this.state.loading ? <CircularProgress color="secondary" 
                            className={clsx(classes.margin)}/> :
                                <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={this.handleSubmit}
                                className={clsx(classes.margin)}
                                >REGISTER</Button>
                            }
                            
                            <br/>
                            <Typography variant="body2" component="p">
                                Already a User? <Link to="/login">Login</Link>
                            </Typography>
                       </Paper>
                        
                    </Grid> 
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Register);