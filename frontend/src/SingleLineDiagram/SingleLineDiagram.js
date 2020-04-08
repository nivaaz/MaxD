import React, { Component } from "react";
import "./SingleLineDiagram.css";
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
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
        circuitBreakerName: ["circuit1", "circuit2", "circuit3", "circuit4", "circuit5", "circuit6"],
        upstreamBreaker: 180,
        mostPhase: 1,
        phase: [],
        numberPoles: 6,
        name: "SLD Name",
        mostCB: 12
    };
    
    onChangeInput = e => {
        let value = e.target.value;
        const name = e.target.name;
        const key = e.target.id;
        console.log(name, key, value)
        /* name for each of the breakers */
        if (name == "circuitBreakerSize"){
            let cb = this.state.circuitBreakerSize;
            cb[key-1] = e.target.value;
            value = cb;
        }
        if (name == "circuitBreakerName"){
            let cb = this.state.circuitBreakerName;
            cb[key-1] = e.target.value;
            value = cb;
        }
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
        return <div className = "SLD emptyButtons" >{buttons}</div>;
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
        let names = this.state.circuitBreakerName;
        const numPole = this.state.numberPoles;
        const len =cb.length;
        // num poles 
        let most = this.state.mostCB;
        if (numPole > len){
            for (let j = 0; j< numPole ; j++){
                if ((j < len) && (cb[j]!=0)){
                    cb[j] = most;
                }
                cb.push(most)
                names.push("name")
            }
        } else if (numPole < len ){
                for (let j=numPole; j<len;j++){
                    cb.pop();
                    names.pop();
                }
        }
        this.setState(
            {
                circuitBreakerSize: cb,
                circuitBreakerName: names
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
            return <h3 className="sldname"> {name} </h3> 
    }

    renderSLD=()=> {
        const cbs = this.state.circuitBreakerSize;
        const returnCB = [];
        const len  = this.state.numberPoles;
        let names = this.state.circuitBreakerName;
        let cb = (this.state.mostPhase == 1)? SinglePhaseCBL:ThreePhaseCBL ;
        
        for (var i = 0; i < len;i = i + 2) {
            returnCB.push(
            <div key={i} className="breaker">
                
                <p id={i} className="breakerNum"> {i+1} </p>
                <input id={i+1} 
                className="breakerName"
                defaultValue={names[i]}
                name = "circuitBreakerName"
                onChange={this.onChangeInput} />
                 
                 <input id={i} name ="circuitBreakerSize"
                    className="breakerSize"
                    defaultValue={cbs[i]}
                    onChange={this.onChangeInput} />
                <img id={i} className = "CBL" src={cb} />
                
                <img  className = "Line" src={Line} />
                
                <img id={i+2} className = "CBR" src={cb} />              
                <input id={i+2} className="breakerSize"
                    name ="circuitBreakerSize"
                    defaultValue={cbs[i+1]} 
                    onChange={this.onChangeInput}/>
                <input id={i+2} 
                    className="breakerName"
                    name="circuitBreakerName"
                    defaultValue={names[i+1]}
                    onChange={this.onChangeInput} />
                <p id={i+2} className="breakerNum"> {i+2} </p>

            </div>
            )
        }
        return returnCB
    }
    render() {
        return (
            <div>
                <h1 className="Pagetitle SLD"> Single Line Diagram </h1>

                <p className="SLD"> Quick & easy to use Single Line Diagram mockups.</p>

                <div className="containerSLD">
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
                                    min = {6}
                                    defaultValue={6}
                                    step={6}
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
                                <h3 className="SLD"> Select Empty Breakers</h3>
                                {this.renderButtons("circuitBreakerSize")}

                            </div>
                        </div>
                    </div>
                    <div className="container-white SLD right">
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
