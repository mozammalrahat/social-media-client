import { MuiThemeProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Component } from 'react';
//Redux
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import { getUserData, logoutUser } from './redux/actions/userActions';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import AuthRoute from './util/AuthRoute.js';
import themeFile from './util/theme';
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000<Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  }else{
    store.dispatch({type:SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData())
  }

}

class App extends Component {

  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <Router>
          <Navbar/>
        <div className='container'>
          <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path ="/users/:handle" component={user}/>
              <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={user}
              />
          </Switch>
        </div>
        </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }

}

export default App;
