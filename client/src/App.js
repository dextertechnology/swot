import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './Home';
import Login from './login/Login';

// class App extends Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//     axios.get('/person')
//       .then(res => {
//         const persons = res.data.person
//         this.setState({persons})
//       })
//   }
  
//   render() {
//     return (
//       <div className="Home">
//         <h1>SWOT Analysis</h1>
//       </div>
//       // <div className="App">
//       //   <header className="App-header">
//       //     <img src={logo} className="App-logo" alt="logo" />
//       //     <h1 className="App-title">Welcome to React</h1>
//       //   </header>
//       //   <p className="App-intro">
//       //     {this.state.persons.map(person => <li key={person._id}>{person.name}</li>)}
//       //   </p>
//       // </div>
//     );
//   }
// }

// export default App;

class App extends Component {
  render() {
     return (
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
     );
  }
}
export default App;