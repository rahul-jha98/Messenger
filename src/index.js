import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';

import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';

import rootReducer from './reducers';
import {setUser} from './actions';

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

const store = createStore(rootReducer);

class Root extends React.Component {
  state = {
    message: ""
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({...this.state, message: 'Logged in as ' + user.displayName});
        this.props.history.push("/");
        this.props.setUser(user);
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={() => (<App isLoading = {this.props.isLoading}/>)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.message.length > 0}
          autoHideDuration={6000}
          onClose={() => {this.setState({...this.state, message: ''})}}
          message = {this.state.message}
          />
      </React.Fragment>
    )
  }
} 

const mapStatesToProps = state => ({
  isLoading: state.user.isLoading
})
const RootWithAuth = withRouter(connect(mapStatesToProps, {setUser})(Root));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store = {store}>
      <Router>
        <RootWithAuth/>
      </Router>    
    </Provider>
  </ThemeProvider>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
