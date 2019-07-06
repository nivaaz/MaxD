import React, { Component } from "react";
import "./SingleLineDiagram.css";
import Slider from '@material-ui/lab/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { range } from "../utils/calcFunctions.js";

const currentColor = "#8200ff";
const PrettoSlider = withStyles({
    root: {
        color: '#8200ff',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: `2px solid ${currentColor}`,
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

class SingleLineDiagram extends Component {
    state = {
        circuitBreakerSize: [12, 24, 36, 0, 0, 0],
        phase: [],
        numberPoles: 6,
        name: "Sample Name"
    };
    toggleSingleOrThree = e => {
        e.preventDefault();
        let newOption =
          this.state.phase === "Single" ? "Three" : "Single";
    
        this.clearInput(this.state.phase);
        this.setState({
          phase: newOption
        });
      };
       /* renders the button select for wattage and current  */
  renderSingleOrThree = () => {
    var options = ["Single", "Three"];
    return options.map((op, key) => {
      const buttonClass =
        this.state.phase === op
          ? "button-active SingleThree"
          : "button-inactive SingleThree";
      return (
        <button
          id={op}
          name="phase"
          className={buttonClass}
          key={key}
          onClick={this.toggleSingleOrThree}
        >
          {op}
        </button>
      );
    });
  };

 
    onChangeInput = e => {
        var name = e.target.name;
        var value = name === "name" ? e.target.value : parseFloat(e.target.value);
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState(
            {
                [name]: value
            },
            () => console.log(name, value)
        );
    };
    renderButtons(id, num){
        const buttonArray = range(0, num);
        console.log(buttonArray);
        const buttons = buttonArray.map((option, key) => {
            return (
              <button
                id={id}
                key={key}
                value={option}
                onClick={this.onButtonClick}
              >
                {option}
              </button>
            );
          });
          return <div>{buttons}</div>;
    }
    render() {
        return (
            <div>
                <h1 className="SLD"> Single Line Diagram </h1>
                <p className="SLD"> Quick & easy to use Single Line Diagram mockups.</p>
                
                <h1 className="SLD"> Plan it out</h1>   
                <div className="container-white SLD">
                    <div>
                        <h3 className="SLD">  Name for diagram</h3>
                        <input onChange={this.onChangeInput} />

                        <div className="slider-holder">
                            <h3 className="SLD"> Upstream Breaker Size</h3>
                            <PrettoSlider
                                id="upstreamBreaker"
                                defaultValue={80}
                                valueLabelDisplay={'auto'}
                                onChange={this.onChangeInput}
                            />
                        </div>

                        <div className="slider-holder">
                            <h3 className="SLD"> Number of Poles</h3>
                            <PrettoSlider
                                defaultValue={18}
                                valueLabelDisplay={'auto'}
                                onChange={this.onChangeInput}
                            />
                        </div>

                        <div className="slider-holder">
                            <h3 className="SLD">Most cb are:</h3>
                            <PrettoSlider defaultValue={45} valueLabelDisplay={'auto'} />
                        </div>
                        <div>
                            <h3 className="SLD"> The phase for most poles is</h3>
                            <button className="SLD active"> Single Phase </button>
                            <button className="SLD inactive"> Three Phase</button>
                        </div>

                        <div>
                            <h3> select empty breakers</h3>
                            {this.renderButtons}
                            <button className="SLD button"> 1 </button>
                            <button className="SLD active"> 6 </button>
                        </div>
                    </div>
                </div>
                <div className="container-white SLD">
                    <div> Upstream breaker size : 200A</div>
                    <div>
                        <div className="breaker">
                            <p className="breakerSize"> 26A</p>
                            <div className="vertline"> </div>
                            <div className="horizLine"></div>
                            <p className="breakerSize"> 36A </p>
                        </div>
                        <div className="breaker">
                            <p className="breakerSize"> 12A</p>
                            <div className="vertline"> </div>
                            <div className="horizLine"></div>
                            <p className="breakerSize"> 16A</p>
                        </div>
                        <div className="breaker">
                            <p className="breakerSize"> 12A</p>
                            <div className="vertline"> </div>
                            <div className="horizLine"></div>
                            <p className="breakerSize"> 16A</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SingleLineDiagram;
