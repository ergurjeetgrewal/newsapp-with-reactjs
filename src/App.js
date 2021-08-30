import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
          <News key="general" pageSize={10} country='in' category='general' headtitle='Top Headlines' />
          </Route>
          <Route exact path="/business">
          <News key="business" pageSize={10} country='in' category='business' headtitle='Business' />
          </Route>
          <Route exact path="/entertainment">
          <News key="entertainment" pageSize={10} country='in' category='entertainment' headtitle='Entertainment' />
          </Route>
          <Route exact path="/health">
          <News key="health" pageSize={10} country='in' category='health' headtitle='Health' />
          </Route>
          <Route exact path="/science">
          <News key="science" pageSize={10} country='in' category='science' headtitle='Science' />
          </Route>
          <Route exact path="/sports">
          <News key="sports" pageSize={10} country='in' category='sports' headtitle='Sports' />
          </Route>
          <Route exact path="/technology">
          <News key="technology" pageSize={10} country='in' category='technology' headtitle='Technology' />
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }
}
