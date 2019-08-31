import React, { Component } from "react";
import "./SingleLineDiagram.css";
import Slider from '@material-ui/lab/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { range } from "../utils/calcFunctions.js";
import Line from '../images/Line.svg'
import SinglePhaseCBL from '../images/SinglePhaseCBL.svg'
import ThreePhaseCBL from '../images/ThreePhaseCBL.svg'

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
        mostPhase: 1,
        phase: [],
        numberPoles: 6,
        name: "SLD Name",
        mostCB: 12
    };
    onChangeInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(
            {
                [name]: value
            },
            () => console.log(name, value)
        );
    };
    onClickUpdatePhase = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
        const phase = e.target.value;
        this.setState(
            {
                mostPhase: phase
            },
            () => console.log("added most phase")
        );
    }
    renderPhaseButtons = () => {
    let phases = [1, 3];
    const id = "mostPhase";
        // set state from Phase button
    let buttons = phases.map((option, key) => {
        let c =( (option==(this.state.mostPhase)) ? "SLD active": "SLD inactive");
        let op = (option==1) ? "Single Phase" : "Three Phase";
        return (
            <button
                id={id}
                key={key}
                value={option}
                className={c}
                onClick={this.onClickUpdatePhase}
            >
                {op}
            </button>
        );
    });
    return <div>{buttons}</div>;         
    }
    /* ON BUTTON CLICK EVENT FUNCTION */
    onButtonClick = e => {
        e.preventDefault();
        let name = e.target.name;
        let key = e.target.id;
        let cb = this.state.circuitBreakerSize;

        if(name == "circuitBreakerSize"){
            console.log(e.target)
            const most = this.state.mostCB;
            cb[key] = (cb[key]==0)? most:0  ;
        }
        let value = cb;
        if (name == "empty")
            this.clearInput(name); 
        this.setState(
            {
                [name]: value
            },
            () => console.log(name, value)
        );
    };
    renderButtons = (id) => {
        const buttonArray = range(1, this.state.numberPoles+2);
        const cb = this.state.circuitBreakerSize;
        const buttons = buttonArray.map((option, key) => {
            let c =( (0==(cb[key])) ? "SLD inactive":"SLD active");
            return (
                <button
                    id={key}
                    key={key}
                    value={option}
                    className={c}
                    name = "circuitBreakerSize"
                    onClick={this.onButtonClick}
                >
                    {option}
                </button>
            );
        });
        return <div>{buttons}</div>;
    }
    setMostCb = () => {
        let cb = this.state.circuitBreakerSize;
        const val = this.state.mostCB
        const len = this.state.numberPoles;
        for (let j=0; j< len ; j++){
             if (cb[j] != 0){
                cb[j] = val;
             }
        }
        this.setState(
            {
                circuitBreakerSize: cb
            },
            () => console.log("set mostcb "+cb)
        );
    }
    setnumPoles = () => {
        let cb = this.state.circuitBreakerSize;
        // num poles 
        let most = this.state.mostCB;
        for (let j = 0; j< this.state.numberPoles ; j++){
            if ((j < cb.length) && (cb[j]!=0)){
                cb[j] = most;
            }
            cb.push(most)
        }
        this.setState(
            {
                circuitBreakerSize: cb
            },
            () => console.log("set numPoles "+cb)
        );
    }
    onChangeSlider = (id, val) => {
        const name = id; 
        console.log(val)
        this.setState(
            {
                [name]: val
            },
            (() => console.log(name, val))
        );
        if (name == 'numberPoles'){this.setnumPoles()}
        if (name == 'mostCB'){this.setMostCb()}/* might override stuff. */
    }
    renderName = ()=>{
        const name = this.state.name;
            return <h3> {name} </h3> 
    }
    renderSLD=()=> {
        const cbs = this.state.circuitBreakerSize;
        const returnCB = [];
        const len  = this.state.numberPoles;
        let cb;
       if (this.state.mostPhase == 1){
         cb = SinglePhaseCBL;
       } else {         
        cb = ThreePhaseCBL;
    }
        for (var i = 0; i < len;i = i + 2) {
            returnCB.push(
            <div key={i} className="breaker">
                <p id={i} className="breakerNum"> {i+1} </p>
                <p id={i} className="breakerSize"> {cbs[i]} </p>
                <img id={i} className = "CBL" src={cb} />
                <img id={i} className = "Line" src={Line} />
                <img id={i} className = "CBR" src={cb} />              
                <p id={i} className="breakerSize"> {cbs[i+1]}</p>
                <p id={i} className="breakerNum"> {i+2} </p>

            </div>
            )
        }
        return returnCB
    }
    render() {
        return (
            <div>
                <h1 className="Pagetitle SLD"> Single Line Diagram </h1>
                <p className="beta">Beta</p>

                <p className="SLD"> Quick & easy to use Single Line Diagram mockups.</p>

                <h1 className="SLD"> Plan it out</h1>
                <div className="SLD holder">
                    <div className="container-white SLD">
                        <div>
                            <h3 className="SLD">  Name for diagram</h3>
                            <input name = "name" onChange={this.onChangeInput} />
                            <div className="slider-holder">
                                <h3 className="SLD"> Upstream Breaker Size </h3>
                                <PrettoSlider
                                    defaultValue={80}
                                    valueLabelDisplay={'auto'}
                                    onChangeCommitted={ (e, val)=>{this.onChangeSlider('upstreamBreaker', val)}}
                                    id="upstreamBreaker"
                                />
                                <p className="breakerSize"> {this.state.upstreamBreaker}</p>
                            </div>
                            <div className="slider-holder">
                                <h3 className="SLD"> Number of Poles</h3>
                                <PrettoSlider
                                    id = "numberPoles"
                                    defaultValue={6}
                                    step={3}
                                    valueLabelDisplay={'auto'}
                                    onChangeCommitted={ (e, val)=>{this.onChangeSlider('numberPoles', val)}}
                             
                                />
                                <p className="breakerSize"> {this.state.numberPoles}</p>

                            </div>

                            <div className="slider-holder">
                                <h3 className="SLD">Most cb are:</h3>
                                <PrettoSlider
                                    id = "mostCB"
                                    defaultValue={45}
                                    valueLabelDisplay={'auto'}
                                    onChangeCommitted={ (e, val)=>{this.onChangeSlider('mostCB', val)}
                                    }
                                />
                                <p className="breakerSize"> {this.state.mostCB}</p>

                            </div>
                            <div>
                                <h3 className="SLD"> The phase for most poles is</h3>
                                {this.renderPhaseButtons()}
                            </div>

                            <div>
                                <h3> select empty breakers</h3>
                                {this.renderButtons("circuitBreakerSize")}

                            </div>
                        </div>
                    </div>
                    <div className="container-white SLD">
                        <div> {this.renderName()} </div> 
                        <div> Upstream Breaker Size {this.state.upstreamBreaker} A</div>
                            {this.renderSLD()}
                        </div>
                    </div>
            </div>
        );
    }
}

export default SingleLineDiagram;
