import React, { Component } from "react";
import "./SingleLineDiagram.css";
import Slider from '@material-ui/lab/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { range } from "../utils/calcFunctions.js";
import Line from '../images/Line.svg'
import SinglePhaseCBL from '../images/SinglePhaseCBL.svg'
import SinglePhaseCBR from '../images/SinglePhaseCBL.svg'
import ThreePhaseCBR from '../images/SinglePhaseCBL.svg'
import ThreePhaseCBL from '../images/SinglePhaseCBL.svg'

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
        circuitBreakerSize: [6, 6, 6, 0, 0, 0],
        upstreamBreaker: 180,
        phase: [],
        numberPoles: 6,
        name: "Sample Name",
        mostCB: 12
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
    renderButtons = (id) => {
        console.log("render buttons")
        const buttonArray = range(0, this.state.numberPoles);
        console.log(buttonArray);
        const buttons = buttonArray.map((option, key) => {
            return (
                <button
                    id={id}
                    key={key}
                    value={option}
                    className="SLD button"
                    onClick={this.onButtonClick}
                >
                    {option}
                </button>
            );
        });
        return <div>{buttons}</div>;
    }
    onButtonClick = e => {
        e.preventDefault();
        var name = e.target.name;
        var value = this.isSelectable(e.target.id)
            ? e.target.value
            : parseFloat(e.target.value);

        this.clearInput(name);
        this.setState(
            {
                [name]: value
            },
            () => console.log(name, value)
        );
    };
    renderSLD() {
        const cbs = this.state.circuitBreakerSize;
        const returnCB = [];
        const len  = this.state.numberPoles;
        for (var i = 0; i < len;i = i + 2) {
            returnCB.push(
            <div className="breaker">
                <p className="breakerSize"> {cbs[i]} </p>
                <img className = "CBL" src={SinglePhaseCBL} />
                <img className = "Line" src={Line} />
                <img className = "CBR" src={SinglePhaseCBR} />              
                <p className="breakerSize"> {cbs[i+1]} </p>
            </div>
            )
        }
        return (
            returnCB
        )
    }
    render() {
        return (
            <div>
                <h1 className="SLD"> Single Line Diagram </h1>
                <p className="SLD"> Quick & easy to use Single Line Diagram mockups.</p>

                <h1 className="SLD"> Plan it out</h1>
                <div className="SLD holder">
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
                                    onChange={(e, val) => {
                                        console.log(val)
                                        var upstreamBreaker = this.state.upstreamBreaker;
                                        this.setState(
                                            {
                                                upstreamBreaker: val
                                            },
                                            () => console.log(upstreamBreaker)
                                        );
                                    }}
                                />
                                <p className="breakerSize"> {this.state.upstreamBreaker}</p>
                            </div>
                            <div className="slider-holder">
                                <h3 className="SLD"> Number of Poles</h3>
                                <PrettoSlider
                                    defaultValue={18}
                                    step={3}
                                    valueLabelDisplay={'auto'}
                                    onChange={(e, val) => {
                                        console.log(val)
                                        var numberPoles = this.state.numberPoles;
                                        this.setState(
                                            {
                                                numberPoles: val
                                            },
                                            () => console.log(numberPoles)
                                        );
                                    }}
                                />
                                <p className="breakerSize"> {this.state.numberPoles}</p>

                            </div>

                            <div className="slider-holder">
                                <h3 className="SLD">Most cb are:</h3>
                                <PrettoSlider
                                    defaultValue={45}
                                    valueLabelDisplay={'auto'}
                                />
                                <p className="breakerSize"> {this.state.mostCB}</p>

                            </div>
                            <div>
                                <h3 className="SLD"> The phase for most poles is</h3>
                                <button
                                    className="SLD active"
                                    value="single"
                                /* on clikc toogle single to triple phase. */
                                >
                                    Single Phase
                                     </button>
                                <button
                                    className="SLD inactive"
                                    value="single">
                                    Three Phase
                                </button>
                            </div>

                            <div>
                                <h3> select empty breakers</h3>
                                {this.renderButtons("circuitBreakerSize")}

                            </div>
                        </div>
                    </div>
                    <div className="container-white SLD">
                        <div> Upstream Breaker Size{this.state.upstreamBreaker} A</div>
                            {this.renderSLD()}
                        </div>
                    </div>
            </div>
        );
    }
}

export default SingleLineDiagram;
