import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/sign-in/sign-in-page';
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

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/sign-in' component={SignInPage} />
          <Route path='/about' component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
