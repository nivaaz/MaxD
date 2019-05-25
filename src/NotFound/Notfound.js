import React, {Component} from 'react'
import './notfound.css';

class Notfound extends Component {
    render() {
      return (
        <div className="notfound">
        <div>
        <i className="fas fa-lightbulb"></i>
        <div className="holder">
        <div className="socket">
          <div className="sock L"></div>
          <div className="sock R"></div>
        </div>
         <div>
          <p className = "plug"><i className="fas fa-plug"></i></p>
        </div>
        </div>
        <h1> Looks like we couldn't make a conection there.</h1>
        </div>

          </div>

      );
    }
  }
export default Notfound