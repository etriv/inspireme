import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/sign-in/sign-in-page';
import RegisterPage from './pages/register-page/register-page';
import AboutPage from './pages/about/about-page';
import Navigation from './components/navigation/navigation';

class App extends Component {
  state = {
    isSignedIn: false,
    user: {
      id: '7',
      name: 'Kelly'
    },
    userMenuItems: [
      { linkText: 'Liked Insp.', linkPath: '/liked' },
      { linkText: 'Upload', linkPath: '/upload' },
      { linkText: 'My Uploads', linkPath: '/uploads' },
      { linkText: 'Sign Out', linkPath: '/sign-out' }
    ]
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Update user upon redirect to '/'
    if (this.props.location.state !== undefined
      && "newUser" in this.props.location.state
      && prevState.user.id !== this.props.location.state.newUser.userId) {
      this.setState(curState => ({
        isSignedIn: true,
        user: {
          ...curState.user,
          id: '',
          name: ''
        }
      }));
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

  handleSignOut = () => {
    this.setState(prevState => ({
      isSignedIn: true,
      user: {
        ...prevState.user,
        id: '',
        name: ''
      }
    }), () => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log('Rendering App with user:', this.state.user);
    return (
      <div className="App">
        <Navigation signedInUser={this.state.user} userMenuItems={this.state.userMenuItems} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/sign-in'>
            <SignInPage onSuccessfulSignIn={this.handleSignIn} />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/about' component={AboutPage} />
          <Route path='/sign-out'>
            <Redirect
              to={{
                pathname: "/",
                state: { newUser: { userId: '', userName: '' } }
              }}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
