import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='in' category='general' headtitle='Top Headlines' />
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='in' category='business' headtitle='Business' />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='in' category='entertainment' headtitle='Entertainment' />
            </Route>
            <Route exact path="/health">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='in' category='health' headtitle='Health' />
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country='in' category='science' headtitle='Science' />
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='in' category='sports' headtitle='Sports' />
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='in' category='technology' headtitle='Technology' />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
