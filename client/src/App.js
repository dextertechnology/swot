import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get('/person')
      .then(res => {
        const persons = res.data.person
        this.setState({persons})
      })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.persons.map(person => <li key={person._id}>{person.name}</li>)}
        </p>
      </div>
    );
  }
}

export default App;
