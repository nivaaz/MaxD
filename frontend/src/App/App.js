import React, { Component } from "react";
import "./App.css";
import Building from '../images/Building.svg'
import CableLady from '../images/cable-lady.svg'
import SukaraLogoWhite from '../images/SukaraLogoWhite.svg'
class App extends Component {
  async apiCall() {
    const response = await fetch("api/hello");
    const message = await response.json();

    console.log(message);
  }

  render() {
    return (
      <div className="App">        
        <div >
        <div className = "center-landing">
          <section className="homeSection">
          <img className="logo" src={SukaraLogoWhite}/>
          <div className="subtext">
          <p>Let's design something 
          <b> powerful </b> together </p>
          </div>
          
          <div className="intro">
          <p> We are changing the face of electrical building design tools. </p> 
          <p>  Our products make electrical design smart, simple and easy to use.
            </p>
          </div>

          </section>
          <section id="about">
          <h2 className="title"> About Sukara Engineering</h2>
          <p> We provide software solutions for electrical engineering building design. </p>
          <p> This ranges from products for maximum demand calculation, cable calculations and design to lighting design  </p>
          <p>  Our mission is to create software that is smart and user oriented.  </p>
          <p> All our products are simple, easy to use and work on any device.  </p>         
          </section>
          <section>
          <h2 className="title"> Our products </h2>
          <div className = "sampleProdContainer">
          <div className = "sampleProduct"> 
            <h3 className = "appHeading"> Single Line Diagram Generator</h3>
            <p> An instant online Single Line Diagram Generator with interactive and simple design. </p>
          </div>
          <div className = "sampleProduct">
          <h3 className = "appHeading"> Maximum Demand Calculator </h3>
          <p> An easy to use Maximum Demand Calculator which includes diversity calculations! </p>
          </div>
          </div>
          </section>
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
