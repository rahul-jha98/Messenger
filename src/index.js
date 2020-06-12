import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import './index.css'

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AppBar from './components/AppBar/AppBar';

import firebase from './firebase';

import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';

import rootReducer from './reducers';
import {setUser, clearUser} from './actions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
});

const theme2 = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
});

const store = createStore(rootReducer);

class Root extends React.Component {
  state = {
    message: "",
    darkMode: false
  }

  showSnackbarMessage(message) {
    this.setState({message: message});
  }

  toggleDarkMode() {
    this.setState({darkMode: !this.state.darkMode});
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.showSnackbarMessage('Logged in as ' + user.displayName);
        this.props.history.replace('/');
        this.props.setUser(user);
      } else {
        this.props.history.replace('/login');
        this.props.clearUser();
      }
    })
  }

  render() {
    return (
      <ThemeProvider theme={this.state.darkMode ? theme2 : theme}>
        <React.Fragment>
          <AppBar user = {this.props.currentUser} toggleDarkMode= {() => this.toggleDarkMode()}/>
          <Switch>
            <Route exact path="/" component={() => (<App isLoading = {this.props.isLoading} user = {this.props.currentUser}/>)} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.message.length > 0}
            autoHideDuration={1000}
            onClose={() => {this.setState({message: ''})}}
            message = {this.state.message}
            />
        </React.Fragment>
      </ThemeProvider>
    )
  }
} 

const mapStatesToProps = state => ({
  isLoading: state.user.isLoading,
  currentUser: state.user.currentUser
})
const RootWithAuth = withRouter(connect(mapStatesToProps, {setUser, clearUser})(Root));

ReactDOM.render(
  
  <Provider store = {store}>
    <Router>
      <RootWithAuth/>
    </Router>    
  </Provider>

 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
