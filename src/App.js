import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/sign-in/sign-in-page';
import RegisterPage from './pages/register-page/register-page';
import AboutPage from './pages/about/about-page';
import Navigation from './components/navigation/navigation';

class App extends Component {
  state = {
    isSignedIn: false,
    user: {
      id: '',
      name: ''
    }
  }

  handleSignIn = (userId, userName) => {
    this.setState(prevState => ({
      isSignedIn: true,
      user: {
        ...prevState.user,
        id: userId,
        name: userName
      }
    }), () => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log('Rendering App with user:', this.state.user);
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/sign-in'>
            <SignInPage onSuccessfulSignIn={this.handleSignIn} />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/about' component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
