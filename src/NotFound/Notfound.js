import React, {Component} from 'react'
import './notfound.css';

class Notfound extends Component {
    render() {
      return (
        <div className="notfound">
        <div>
        <i className="fas fa-lightbulb"></i>
        <h2> Oops, looks like we haven't connect this page to power yet.</h2>
        <h2> Click Home, to navigate back.</h2>

        </div>

          </div>

      );
    }
  }
export default Notfound