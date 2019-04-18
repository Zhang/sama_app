import React, { Component } from 'react';
import FormSelect from './components/formSelect';
import Form from './components/form';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={FormSelect} />
            <Route path="/form" exact component={Form} />
            <Route path="/form/:id" exact component={Form} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
