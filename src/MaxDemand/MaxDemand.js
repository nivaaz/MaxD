import React, { Component } from "react";
import "./maxdemand.css";
import { getWattage, getCurrent } from "../utils/calcFunctions.js";

class MaxDemand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadRepetitions: 1,
      name: "Item",
      voltage: 240.0,
      current: 15.0,
      wattage: 10.0,
      selectedOption: "wattage",
      powerFactor: 1.0,
      diversity: 1.0,
      data: [],
      totalW: 1.0,
      totalA: 11,
      totalLoad: "A"
    };
    this.onClickDeleteLoad = this.onClickDeleteLoad.bind(this);
  }

  /* update the total wattage load */
  setTotalW = () => {
    let sum = 0;
    this.state.data.map(
      option => (sum = sum + option.loadRepetitions * option.wattage)
    );
    this.setState({
      totalW: sum
    });
  };
  /* update the total current load */
  setTotalA = () => {
    let sum = 0;
    this.state.data.map(
      option => (sum = sum + option.loadRepetitions * option.current)
    );
    this.setState({
      totalA: sum
    });
  };
  /* reset all the states to a default value. */
  resetAll = () => {
    this.setState({
      voltage: 240.0,
      current: 1.0,
      loadRepetitions: 1,
      diversity: 1.0,
      powerFactor: 1.0,
      name: "Load",
      wattage: 240.0
    });
  };
  /* on submission of the form */
  onSubmit = e => {
    e.preventDefault();
    /* work out the wattage or current. */
    var wattage = 0;
    var current = 0;
    if (this.state.selectedOption === "current") {
      wattage = getWattage(
        this.state.voltage,
        this.state.current,
        this.state.diversity,
        this.state.powerFactor
      );
      current = this.state.current;
    } else if (this.state.selectedOption === "wattage") {
      current = getCurrent(
        this.state.voltage,
        this.state.wattage,
        this.state.diversity,
        this.state.powerFactor
      );
      wattage = this.state.wattage;
    }

    const dataNew = {
      loadRepetitions: this.state.loadRepetitions,
      name: this.state.name,
      voltage: this.state.voltage,
      current: current,
      powerFactor: this.state.powerFactor,
      wattage: wattage,
      diversity: this.state.diversity
    };

    const currData = this.state.data;
    currData.push(dataNew);
    this.setState({
      data: currData
    });
    this.resetAll(); //resets the input values.
    this.setTotalA();
    this.setTotalW();
  };
  /* red dleete button next to load */
  onClickDeleteLoad(e) {
    const currLoadData = this.state.data;
    currLoadData.splice(e.target.id, 1);
    this.setState({
      data: currLoadData
    });
  }
  /* on the change of custom input */
  onChangeInput = e => {
    var name = e.target.name;
    var value = name === "name" ? e.target.value : parseFloat(e.target.value);

    this.setState(
      {
        [name]: value
      },
      () => console.log(name, value)
    );
  };

  isSelectable = id =>
    Boolean(id === "voltage" || id === "current" || id === "wattage");

  clearInput = name => {
    var componentInputId = `${name}-input`;
    // if not null : an input box exists, clear the input box
    if (document.getElementById(componentInputId)) {
      document.getElementById(componentInputId).value = "";
    }
  };

  /* FUNCTION TO HANDLE ALL BUTTON INTPUTS FROM 
  VOLTAGE   CURRENT   DIVERSITY   WATTAGE    PF
   */
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

  renderPowerFactorButtons() {
    const pf = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const buttons = pf.map((option, key) => {
      // console.log(this.state.powerFactor === option, this.state.powerFactor, option)
      const buttonClass =
        this.state.powerFactor && this.state.powerFactor === option
          ? "button-active"
          : "button-inactive";
      return (
        <button
          id="powerFactor"
          name="powerFactor"
          className={buttonClass}
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

  renderDiversityButtons() {
    const diversityOptions = [
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      1
    ];
    const buttons = diversityOptions.map((option, key) => {
      // console.log(this.state.diversity === option, this.state.diversity, option)
      const buttonClass =
        this.state.diversity && this.state.diversity === option
          ? "button-active"
          : "button-inactive";
      return (
        <button
          id="diversity"
          name="diversity"
          className={buttonClass}
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

  renderVoltageButtons() {
    const voltageOptions = [230, 240, 400, 415];
    return voltageOptions.map((option, key) => {
      // console.log(this.state.voltage === option, this.state.voltage, option)
      const buttonClass =
        this.state.voltage && this.state.voltage === option
          ? "button-active"
          : "button-inactive";
      return (
        <button
          id="voltage"
          name="voltage"
          className={buttonClass}
          key={key}
          value={option}
          onClick={this.onButtonClick}
        >
          {option}
        </button>
      );
    });
  }

  toggleCurrentOrWattage = e => {
    e.preventDefault();
    let newOption =
      this.state.selectedOption === "current" ? "wattage" : "current";

    this.clearInput(this.state.selectedOption);
    this.setState({
      selectedOption: newOption
    });
  };

  /* renders the button select for wattage and current  */
  renderCurrentOrWattage() {
    var options = ["current", "wattage"];
    return options.map((op, key) => {
      const buttonClass =
        this.state.selectedOption === op
          ? "button-active currentWattage"
          : "button-inactive currentWattage";
      return (
        <button
          id={op}
          name="selectedOption"
          className={buttonClass}
          key={key}
          onClick={this.toggleCurrentOrWattage}
        >
          {op}
        </button>
      );
    });
  }

  renderTotalLoadButton() {
    const options = ["A", "W"];
    return options.map((op, key) => {
      const buttonClass =
        this.state.totalLoad === op ? "button-active" : "button-inactive";
      return (
        <button
          className={"totalLoad " + buttonClass}
          key={key}
          value={op}
          onClick={this.onButtonClick}
          id="totalLoad"
          name="totalLoad"
        >
          {op}
        </button>
      );
    });
  }
  renderTotal() {
    if (this.state.totalSelect === "A") {
      return <h2 className="totalLoad">Total Load is {this.state.totalA}</h2>;
    } else {
      return <h2 className="totalLoad">Total Load is {this.state.totalW}</h2>;
    }
  }
  // /* upon clicking the W or A, the load changes accordingly.*/
  // onButtonClickTotal(e) {
  //   this.setState(
  //     {
  //       totalSelect: e.target.value
  //     },
  //     () => console.log(this.state.totalSelect)
  //   );
  // }
  renderLoadList() {
    return this.state.data.map((load, key) => {
      return (
        <div key={key} className="cat-data grid">
          <p> {load.loadRepetitions} </p>
          <p> {load.name} </p>
          <p> {load.voltage} </p>
          <p> {load.wattage} </p>
          <p> {load.current} </p>
          <p> {load.powerFactor} </p>
          <p> {load.diversity} </p>
          <button
            id={key}
            onClick={this.onClickDeleteLoad}
            className="button-delete-load"
          >
            X
          </button>
        </div>
      );
    });
  }
  /* get the wattage from the input box */
  // getWattageCurrent(e) {
  //
  //   console.log(e.target.value)
  //   if (this.state.select === "wattage") {
  //     this.setState({
  //       select: e.target.value
  //     }, () => console.log(this.state.Wattage))
  //   } else if (this.state.select === "current") {
  //     this.setState({
  //       select: e.target.value
  //     }, () => console.log(this.state.Current))
  //   }
  // }
  render() {
    return (
      <div className="grid grid-col-two">
        <h1 className="Pagetitle grid-span-two">Maximum Demand</h1>
        <form className="MaxD">
          <div className="container">
            <h2 className="picker title"> Name your load</h2>
            <input
              value={this.state.name}
              type="text"
              onChange={this.onChangeInput}
              id="name"
              name="name"
            />
          </div>
          <div className="container">
            <h2 className="picker title"> How many repitions of this load?</h2>
            <input
              defaultValue={this.state.loadRepetitions}
              type="number"
              onChange={this.onChangeInput}
              id="loadRepetitions"
            />
          </div>
          <div className="container">
            <h2 className="picker title"> Pick a Voltage</h2>
            <div className="voltage">
              {this.renderVoltageButtons()}
              <input
                onChange={this.onChangeInput}
                id="voltage-input"
                type="number"
                name="voltage"
              />
            </div>
          </div>

          <div className="container WI">
            <h2 className="WI">Add a {this.state.selectedOption}</h2>
            <div className="holder-WI">{this.renderCurrentOrWattage()}</div>
            <input
              defaultValue="10"
              id={`${this.state.selectedOption}-input`}
              type="number"
              onChange={this.onChangeInput}
              name={this.state.selectedOption}
            />
          </div>
          <div className="container">
            <h2 className="picker title"> Add a power factor</h2>
            {this.renderPowerFactorButtons()}
          </div>
          <div className="container">
            <h2 className="picker title"> Add a diversity</h2>
            {this.renderDiversityButtons()}
          </div>
        </form>
        <div className="MaxD">
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
            {this.renderLoadList()}
            {this.renderTotal()}
            {this.renderTotalLoadButton()}
          </div>
        </div>
        <button className="addLoad" onClick={this.onSubmit}>
          Add load
        </button>
      </div>
    );
  }
}
export default MaxDemand;
