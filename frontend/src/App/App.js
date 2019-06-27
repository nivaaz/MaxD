import React, { Component } from "react";
import "./App.css";
import Building from '../images/Building.svg'
import SukaraWhite from '../images/sukara-logo-white.svg'
import CableLady from '../images/cable-lady.svg'

class App extends Component {
  async apiCall() {
    const response = await fetch("api/hello");
    const message = await response.json();

    console.log(message);
  }

  render() {
    this.apiCall();
    return (
      <div className="App">        
        <div className ="grid-two" >

        <div className = "center-landing">
       <h1 className="sukara"> Sukara </h1>
          <h1 className ="engineering">Engineering</h1>
          <h1 className="landingQ"> Let's design something powerful together</h1>
          
          <div className="emailHolder">
            <h1>Want to be the first to know when we launch?</h1>
            <input/> 
            <button className="landingButton"> Sign me up</button>
            </div>
          
          </div>
        
        <div className = "center-landing-img">
        <img src={Building} />
        <img className = "cableLady" src={CableLady} />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
