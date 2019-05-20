import React, { Component } from 'react';
import logo from './logo.svg';
import './maxd.css'
import { get } from 'http';
import { getWattage, getCurrent } from './calcFunctions.js'

class Maxd extends Component {
  constructor(props) {
    super(props);
    this.state = { Amount: 1, Name: "Item", Voltage: 240, Current: 15, Wattage: 10, select: "wattage", Pf: 1, Diversity: 1, Data: [] }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickDeleteLoad = this.onClickDeleteLoad.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }
 /* reset all the states to a default value. */
 resetAll() {
  this.setState({
    Voltage: 240, 
    Current: 1, 
    Amount: 1, 
    Diversity: 1, 
    Pf: 1, 
    Name: "Load", 
    Wattage: 240
  })
  } /* on submission of the form */
  onSubmit(e) {
    e.preventDefault();
    const dataNew = {
      "Amount": this.state.Amount,
      "Name": this.state.Name,
      "Voltage": this.state.Voltage,
      "Current": this.state.Current,
      "Pf": this.state.Pf,
      "Wattage": this.state.Wattage,
      "Diversity": this.state.Diversity
    };
   
    const currData = this.state.Data;
    currData.push(dataNew)
    this.setState({
      Data: currData
    })
    this.resetAll(); //resets the input values.
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
    /*if not null : an input box exists*/
    if (document.getElementById(e.target.id)) {
      document.getElementById(e.target.id).value = ""; /* wipe the input box */
    }
    console.log(e.target.id)
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
      this.setState({
        select: e.target.value
      }, () => console.log(this.state))
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
    const options = ["wattage", "current"]
    return options.map((op, key) => {
      const buttonClass = this.state.select && this.state.select === op ? 'button-active currentWattage' : 'button-inactive currentWattage'
      return (
          <button id="select" className={buttonClass} key={key} value={op} onClick={this.onButtonClick} > {op} </button>
      )
    }
    )
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
         
          </div>

        </div>
        <button className="addLoad" onClick={this.onSubmit}> Add load</button>
      </div>
    );
  }
}
export default Maxd
