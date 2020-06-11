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
    bg: {
        background: theme.palette.type === 'dark' ? '#373737': '#fafafa'
    },
    link: {
        color: theme.palette.secondary.main
    }
  });

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
            
            emailError: '',
            passwordError: '',
            loading: false,
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
        
        if (this.state.email.length === 0) {

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
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(signedInUser => {
                        console.log(signedInUser);
                        this.setState({...this.state, loading: false});
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

    render() {
        const {classes} = this.props;
    
        return (
            <div className={classes.root + " app " + classes.bg}>
                <Grid container justify='center'>
                    <Grid item  style={{maxWidth: 550, textAlign: 'center'}}>
                       <Paper elevation={2} style={{padding: 30, borderRadius: 10, margin: '1em'}}>
                            <img src={logo} alt="logo" style={{margin:'auto'}} width='50%' height='30%'/>
                            <Typography variant = 'h5' >Login to Messenger</Typography>
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
                                >LOGIN</Button>
                            }
                            
                            <br/>
                            <Typography variant="body2" component="p">
                                Don't have an account? <Link to="/register" replace className={classes.link}>Register</Link>
                            </Typography>
                       </Paper>
                        
                    </Grid> 
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Login);