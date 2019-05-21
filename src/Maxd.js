import React, { Component } from 'react';
import './maxd.css'
import { getWattage, getCurrent } from './calcFunctions.js'

class Maxd extends Component {
  constructor(props) {
    super(props);
    this.state = { Amount: 1,
       Name: "Item",
        Voltage: 240.0,
         Current: 15.0,
          Wattage: 10.0,
           select: "wattage",
            Pf: 1.0,
             Diversity: 1.0,
              Data: [],
               totalW: 1.0,
     totalA: 11, 
     totalSelect :'A'
     }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickDeleteLoad = this.onClickDeleteLoad.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.onButtonClickTotal = this.onButtonClickTotal.bind(this);
    this.setTotalA = this.setTotalA.bind(this);
    this.setTotalW = this.setTotalW.bind(this);
  }
  /* update the total wattage load */
  setTotalW(){
   let sum = 0;
   this.state.Data.map((option) =>
   sum = sum + (option.Amount * option.Wattage)
 )
    this.setState({
      totalW: sum
    })
  }
  /* update the total current load */
  setTotalA(){
    let sum = 0;
    this.state.Data.map((option) =>
      sum = sum + (option.Amount * option.Current)
    )
    this.setState({
      totalA: sum
    })
    
  }
 /* reset all the states to a default value. */
 resetAll() {
  this.setState({
    Voltage: 240.0, 
    Current: 1.0, 
    Amount: 1, 
    Diversity: 1.0, 
    Pf: 1.0, 
    Name: "Load", 
    Wattage: 240.0
  })
  } /* on submission of the form */
  onSubmit(e) {
    e.preventDefault();
    /* work out the wattage or current. */
    var wattage = 0;
    var current = 0;
    if(this.state.select === "current"){
      wattage = getWattage(parseInt(this.state.Voltage), 
      parseInt(this.state.Current),
        parseInt(this.state.Diversity), 
          parseInt(this.state.Pf) )
      current = this.state.Current;
    } else if (this.state.select === "wattage"){
      current = getCurrent(parseInt(this.state.Voltage), 
      parseInt(this.state.Wattage),
        parseInt(this.state.Diversity), 
          parseInt(this.state.Pf) )
      wattage = this.state.Wattage;
    }

    const dataNew = {
      "Amount": this.state.Amount,
      "Name": this.state.Name,
      "Voltage": this.state.Voltage,
      "Current": current,
      "Pf": this.state.Pf,
      "Wattage": wattage,
      "Diversity": this.state.Diversity
    };
   
    const currData = this.state.Data;
    currData.push(dataNew)
    this.setState({
      Data: currData
    })
    this.resetAll(); //resets the input values.
    this.setTotalA();
    this.setTotalW();
  }
  /* red dleete button next to load */
  onClickDeleteLoad(e){
    const currLoadData = this.state.Data
    currLoadData.splice(e.target.id, 1)
    this.setState({
      Data: currLoadData
    })
  }
  /* on the change of custom input */
  onChangeInput(e) {
    e.preventDefault();
    var id = e.target.id
    if (id === "voltage") {
      this.setState({
        Voltage: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "current") {
      this.setState({
        Current: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "wattage") {
      this.setState({
        Wattage: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "pf") {
      this.setState({
        Pf: parseFloat(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "diversity") {
      this.setState({
        Diversity: parseFloat(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "name") {
      this.setState({
        Name: e.target.value
      }, () => console.log(this.state))
    }
    else if (id === "amount") {
      this.setState({
        Amount: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
  }
  /* FUNCTION TO HANDLE ALL BUTTON INTPUTS FROM 
  VOLTAGE   CURRENT   DIVERSITY   WATTAGE    PF
   */
  onButtonClick(e) {
    e.preventDefault();
    console.log(e.target.id)
    /*if not null : an input box exists*/
    if (document.getElementById(e.target.id)) {
      document.getElementById(e.target.id).value = ""; /* wipe the input box */
    }
    // var volts = this.state.Voltage;
    var id = e.target.id
    if (id === "voltage") {
      this.setState({
        Voltage: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "current") {
      this.setState({
        Current: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "wattage") {
      this.setState({
        Wattage: parseInt(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "pf") {
      this.setState({
        Pf: parseFloat(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "diversity") {
      this.setState({
        Diversity: parseFloat(e.target.value)
      }, () => console.log(this.state))
    }
    else if (id === "select") {
      /* HARDCODED FIX FOR WATTAGE NAME & BUTTON RENDER ERROR */
      if (e.target.value == "current")
      this.setState({
        select: e.target.value
      }, () => console.log("select changed " + this.state.select))
      else {
        this.setState({
          select: "wattage"
        }, () => console.log("select changed " + this.state.select))
      }
    }
  }
  renderPowerFactorButtons() {
    const pf = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    const buttons = pf.map((option, key) => {
      console.log(this.state.Pf === option, this.state.Pf, option)
      const buttonClass = this.state.Pf && this.state.Pf === option ? 'button-active' : 'button-inactive'
      return (
        <button id="pf" className={buttonClass} key={key} value={option} onClick={this.onButtonClick}> {option}</button>
      )
    })
    return (<div>{buttons}</div>
    )
  }
  renderDiversityButtons() {
    const pf = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    const buttons = pf.map((option, key) => {
      console.log(this.state.Diversity === option, this.state.Diversity, option)
      const buttonClass = this.state.Diversity && this.state.Diversity === option ? 'button-active' : 'button-inactive'
      return (
        <button id="diversity" className={buttonClass} key={key} value={option} onClick={this.onButtonClick}> {option}</button>
      )
    })
    return (<div>{buttons}</div>
    )
  }
  renderVoltageButtons() {
    const voltageOptions = [230, 240, 400, 415]
    return voltageOptions.map((option, key) => {
      console.log(this.state.Voltage === option, this.state.Voltage, option)
      const buttonClass = this.state.Voltage && this.state.Voltage === option ? 'button-active' : 'button-inactive'
      return (
        <button id="voltage" className={buttonClass} key={key} value={option} onClick={this.onButtonClick}> {option}</button>
      )
    })
  }
  /* renders the button select for wattage and current  */
  renderWandI() {
    var options = ["wattage", "current"]
    return options.map((op, key) => {
      const buttonClass = this.state.select && this.state.select === op ? 'button-active currentWattage' : 'button-inactive currentWattage'
      return (
          <button value={op} id="select" className={buttonClass} key={key} onClick={this.onButtonClick} > {op} </button>
      )
    }
    )
  }
  renderTotalLoadButton(){
    const options = ["A", "W"]
    return options.map((op, key) => {
      const buttonClass = this.state.totalSelect && this.state.totalSelect === op ? 'button-active' : 'button-inactive'
      return (
          <button className ="totalLoad" className={buttonClass} key={key} value={op} onClick={this.onButtonClickTotal} > {op} </button>
      )
    }
    )
  }
  renderTotal(){
    if (this.state.totalSelect==='A'){
      return (
        <h2 className = "totalLoad">Total Load is {this.state.totalA }</h2>
      )
    } else {
      return (
        <h2 className = "totalLoad">Total Load is {this.state.totalW }</h2>
      )
    }
  }
  /* upon clicking the W or A, the load changes accordingly.*/ 
  onButtonClickTotal(e){
    e.preventDefault();
    this.setState({
      totalSelect: e.target.value
    }, () => console.log(this.state.totalSelect))
  }
  renderLoad() {
    return this.state.Data.map((load, key) => {
      return (
        <div key={key} className="cat-data grid">
          <p> {load.Amount} </p>
          <p> {load.Name} </p>
          <p> {load.Voltage} </p>
          <p> {load.Wattage} </p>
          <p> {load.Current} </p>
          <p> {load.Pf} </p>
          <p> {load.Diversity} </p>
          <button id={key} onClick = {this.onClickDeleteLoad} className="button-delete-load"> X </button>
        </div>
      )
    })
  }
  /* get the wattage from the input box */
  getWattageCurrent(e) {
    e.preventDefault();
    console.log(e.target.value)
    if (this.state.select === "wattage") {
      this.setState({
        select: e.target.value
      }, () => console.log(this.state.Wattage))
    } else if (this.state.select === "current") {
      this.setState({
        select: e.target.value
      }, () => console.log(this.state.Current))
    }
  }
  render() {
    return (
      <div className="grid grid-col-two">
        <h1 className="Pagetitle grid-span-two">Maximum Demand</h1>
        <form className="MaxD">
          <div className="container">
            <h2 className="picker title"> Name your load</h2>
            <input defaultValue={this.state.Name} type="text" onChange={this.onChangeInput} id="name" />
          </div>
          <div className="container">
            <h2 className="picker title"> How many repitions of this load?</h2>
            <input defaultValue={this.state.Amount} type="number" onChange={this.onChangeInput} id="amount" />
          </div>
          <div className="container">
            <h2 className="picker title"> Pick a Voltage</h2>
            <div className="voltage">
              {this.renderVoltageButtons()}
              <input onChange={this.onChangeInput} id="voltage" type="number" name="voltage" />
            </div>
          </div>
          <div className="container WI">
            <h2 className = "WI">Add a {this.state.select}</h2>
            <div className = "holder-WI">
              {this.renderWandI()}
            </div>
            <input defaultValue= '10' id={this.state.select} type="number" onChange={this.onChangeInput} name={this.state.select} />
          </div>
          <div className="container">
            <h2 className="picker title"> Add a power factor</h2>
            {this.renderPowerFactorButtons()}
          </div >
          <div className="container">
            <h2 className="picker title"> Add a diversity</h2>
            {this.renderDiversityButtons()}
          </div >
        </form>
        <div>
          <div className="container">
            <div className="cat-name grid">
              <p> Amount </p>
              <p> Name </p>
              <p> Voltage </p>
              <p> Wattage </p>
              <p> Current </p>
              <p> Power Factor </p>
              <p> Diversity </p>
            </div>
              {this.renderLoad()}
              {this.renderTotal()}
              {this.renderTotalLoadButton()}
          </div>
        </div>
        <button className="addLoad" onClick={this.onSubmit}> Add load</button>
      </div>
    );
  }
}
export default Maxd
