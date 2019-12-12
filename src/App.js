import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation'
import SearchArea from './components/search-area/search-area'
import Gallery from './components/gallery/gallery'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <SearchArea />
        <Gallery />
      </div>
    );
  }
}

export default App;
