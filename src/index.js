import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Maxd from './Maxd.js'
import Notfound from './Notfound.js'


const routing = (
    <Router>
      <div>
        <div className = "navbar">       
            <Link to="/"> Home </Link>
            <Link to="/Maxd">Maximum Demand</Link>
        </div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/Maxd" component={Maxd} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))

  // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
