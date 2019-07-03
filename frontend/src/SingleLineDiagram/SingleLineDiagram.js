import React, { Component } from "react";
import "./SingleLineDiagram.css";
import Slider from '@material-ui/lab/Slider';

class SingleLineDiagram extends Component {
  render() {
    return (
    <div>
        <h1 className="SLD"> Single Line Diagram </h1>
        <div className="container SLD">
        <h2 className="SLD"> Plan it out</h2>
        <div>
         <div>
             <h3 className="SLD">  Name for diagram</h3>
             <input/>
         </div>
         <div>
             <h3 className="SLD"> Number of Poles</h3>
             <input/>
         </div>
         <div>
             <h3 className="SLD"> Most of your poles are</h3>
             <button> Single Phase </button>
             <button> Three Phase</button>
         </div>
         <div>
             <h3 className="SLD">Most cb are </h3>
             <div className="slider-holder">
                <Slider
                marks={true}
                valueLabelDisplay="on"
                max = "800"
                step = "10"
                />
             </div>
             <input/>
         </div>   
        </div>
        </div>
        </div>
    );
  }
}

export default SingleLineDiagram;
