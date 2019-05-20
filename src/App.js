import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
  <div className="landing">
          <h1 className="title">Sukara</h1>
          <p>Electrical Building Design Made Simple</p>
          <h1 className="landingQ"> Let's build something powerful together</h1>
          <div classname="buttonWrapper">
            <button className="landingButton"> Show me how</button>
          </div>
          </div>

          <div className="pageContainer">
          <div className="page">
          <h2 className="title sldg"> Single Line Diagrams</h2>
            <p><i className="fas fa-plug"></i></p> 
            <p className = "info"> Add in circuit breaker, poles and names for your DB and we'll draw it for you.
                                  Then export it to a pdf or send it right away!</p>
          </div>
          <div className="page">
          <h2 className="title pv"> Photovoltaics</h2>
          <p> <i className="fas fa-solar-panel"></i></p>
          <p className = "info"> We'll help you decide if installing solar pannels is a good idea, without any hard maths.</p>

          </div>
          <div className="page">
          <h2 className="title mdc">Maximum Demand</h2>
          <p > <i className="fas fa-calculator"></i></p>
          <p className = "info"> Beautiful and simple Maximum demand calculation, because it shouldn't be tedious and ugly.</p>

          </div>
          <div className="page">
          <h2 className="title ai">Lighting</h2>
          <p> <i className="far fa-lightbulb"></i></p>
          <p className = "info"> Automatic lighting design. Tell us the dimensions of your room, the size and we'll do the work for you.</p>
          </div>
          </div>
        </div>

    );
  }
}

export default App;
