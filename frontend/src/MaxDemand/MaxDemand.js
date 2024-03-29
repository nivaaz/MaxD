import React, { Component } from "react";
import "./maxdemand.css";
import { getWattage, getCurrent } from "../utils/calcFunctions.js";

class MaxDemand extends Component {
  state = {
    loadRepetitions: 1,
    name: "Item",
    voltage: 240.0,
    current: 15.0,
    wattage: 10.0,
    selectedOption: "wattage",
    powerFactor: 1.0,
    diversity: 1.0,
    data: [],
    totalW: 1.00,
    totalA: 1.00,
    totalLoad: "A"
  };

  /* update the total wattage load */
  setTotalW = () => {
    var sum = 0.0;
    console.log("wattage is currently " + this.state.wattage)
    console.log("TOTAL W is currently " + this.state.totalW)

    this.state.data.map(
      option => (sum = sum + (option.loadRepetitions * option.wattage))
    );
    return sum;
  };
  /* update the total current load */
  setTotalA = () => {
    let sum = 0;
    this.state.data.map(
      option => (sum = sum + (option.loadRepetitions * option.current))
    );
    return sum;
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

    const newData = {
      loadRepetitions: this.state.loadRepetitions,
      name: this.state.name,
      voltage: this.state.voltage,
      current: current,
      powerFactor: this.state.powerFactor,
      wattage: wattage,
      diversity: this.state.diversity
    };

    this.setState({
      data: [...this.state.data, newData]
    }, () => this.setTotals());

    this.resetAll(); //resets the input values.
  };

  setTotals = () => {
    var totalA = this.setTotalA();
    var totalW = this.setTotalW();

    console.log("totals are: ", totalA, totalW)
    this.setState({
      totalA: totalA,
      totalW: totalW
    });
  }
  /* red dleete button next to load */
  onClickDeleteLoad = e => {
    const currLoadData = this.state.data;
    var wattage = 0.1;
    var amps = 0.1;

    currLoadData.splice(e.target.id, 1);
    this.setState(
      {
        data: currLoadData
      },
      () => {
        console.log("delete done")
      }
    );

    amps = this.setTotalA();
    wattage = this.setTotalW();

    this.setState({
      totalA: amps,
      totalW: wattage
    }, () => {
      console.log("amps/wattage added")
    })

  };
  /* on the change of custom input */
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

  isSelectable = id => Boolean(id === "current" || id === "wattage");

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

  renderPowerFactorButtons = () => {
    const pf = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
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
    return <div className="pf-buttons">{buttons}</div>;
  };

  renderDiversityButtons = () => {
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
    return <div className="pf-buttons">{buttons}</div>;
  };

  renderVoltageButtons = () => {
    const voltageOptions = [230, 240, 400, 415];
    let vop = voltageOptions.map((option, key) => {
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
    vop.push(<input
      onChange={this.onChangeInput}
      id="voltage-input"
      type="number"
      name="voltage"
    />)
    return <div className="voltage_holder"> {vop} </div>
  };

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
  renderCurrentOrWattage = () => {
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
  };

  toggleTotalLoadOptions = e => {
    e.preventDefault();
    let newOption = this.state.totalLoad === "A" ? "W" : "A";

    this.clearInput(this.state.totalLoad);
    this.setState({
      totalLoad: newOption
    });
  };

  renderTotalLoadButton() {

    const options = ["A", "W"];
    if (this.state.data.length === 0) {
      return <h3> Added loads will show here </h3>;
    } else {
      return options.map((op, key) => {
        const buttonClass =
          this.state.totalLoad === op ? "button-active" : "button-inactive";
        return (
          <button
            className={"totalLoad " + buttonClass}
            key={key}
            value={op}
            onClick={this.toggleTotalLoadOptions}
            id="totalLoad"
            name="totalLoad"
          >
            {op}
          </button>
        );
      });
    }
  }
  renderTotalLoad = () => {
    if (this.state.data.length === 0) {
      return null;
    } else {
      if (this.state.totalLoad === "A") {
        return (
          <h2 className="totalLoad MD">Total Load is {this.state.totalA}</h2>
        )
      } else if (this.state.totalLoad === "W") {
        return (
          <h2 className="totalLoad MD">Total Load is {this.state.totalW}</h2>
        )
      }
    }
  }

  renderLoadList = () => {

    return this.state.data.map((load, key) => {
      return (
        <div key={key} className="cat-data">
          <p className="load-data"> {load.loadRepetitions} </p>
          <p className="load-data"> {load.name} </p>
          <p className="load-data"> {load.voltage} </p>
          <p className="load-data"> {load.wattage} </p>
          <p className="load-data"> {load.current} </p>
          <p className="load-data"> {load.powerFactor} </p>
          <p className="load-data"> {load.diversity} </p>
          <button
            id={key}
            onClick={this.onClickDeleteLoad}
            className="button-delete-load"
          >
            X          </button>
        </div>
      );
    });

  };

  render() {
    return (
      <div className="top">
        <h1 className="MD Pagetitle">Maximum Demand</h1>
        <p classname="block"> A dynamic maximum demand calculator for electrical loads.</p>
        
        <div className="maxDContainer">
        
          <div className="maxDL">
            <div className="container-white">
              <h2 className="picker title">Name your load</h2>
              <input
                value={this.state.name}
                type="text"
                onChange={this.onChangeInput}
                id="name"
                name="name"
              />
            </div>
            <div className="container-white">
              <h2 className="picker title">How many repitions of this load?</h2>
              <input
                defaultValue={this.state.loadRepetitions}
                type="number"
                onChange={this.onChangeInput}
                id="loadRepetitions"
                name="loadRepetitions"
              />
            </div>
            <div className="container-white">
              <h2 className="picker title">Pick a Voltage</h2>
              <div className="voltage">
                {this.renderVoltageButtons()}
              </div>
            </div>

            <div className="container-white WI">
              <h2 className="WI picker title">Add a </h2>
              <div className="holder-WI">{this.renderCurrentOrWattage()}</div>
              <input
                defaultValue="10"
                id={`${this.state.selectedOption}-input`}
                type="number"
                onChange={this.onChangeInput}
                name={this.state.selectedOption}
              />
            </div>
            <div className="container-white">
              <h2 className="picker title"> Add a power factor</h2>
              {this.renderPowerFactorButtons()}
            </div>
            <div className="container-white">
              <h2 className="picker title"> Add a diversity</h2>
              {this.renderDiversityButtons()}
            </div>
            <button className="addLoad" onClick={this.onSubmit}>
              Add load
        </button>
          </div>

          <div className="maxDR">
              <h1 className = "picker title"> Added Loads </h1>
              <div className="cat-name">
                <p class="load-title"> # </p>
                <p class="load-title"> Name </p>
                <p class="load-title"> V </p>
                <p class="load-title"> W </p>
                <p class="load-title"> A </p>
                <p class="load-title"> PF </p>
                <p class="load-title"> Diversity </p>
              </div>
              {this.renderLoadList()}
              <div className="totalLoads">
              {this.renderTotalLoad()}
              {this.renderTotalLoadButton()}
              </div>
            </div>
          </div>
      </div>
    );
  }
}
export default MaxDemand;
