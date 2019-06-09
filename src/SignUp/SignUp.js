import React, { Component } from 'react';
import './signup.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "a string"
        }
        /*FUNCTION DEFINITIONS GO HERE.*/
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }
    onSubmit() {
        console.log(this.state.email)
        console.log("calling database...")
    }
    renderEmailButton = () => {
        if (this.state.email.length === 0) {
            return (
                <div>
                    <input
                        type="text"
                        placeholder="Share your email"
                        onChange={this.onChange}
                    >
                    </input>
                    <button className="launch" onClick={this.onSubmit}> Share email </button>
                </div>
            )
        }
        else {
            return (
                <h3 > Thanks! We'll be in touch soon. </h3>
            )
        }

    }
    render() {
        return (
            <div className="launchDiv">
                <div >
                    <h1 className="sukara">Sukara</h1>
                    <h1 className="engineering">Engineering</h1>
                    <h1 className="landingQ"> Let's build something powerful together</h1>
                </div>
                <h3> Let's design something powerful together. </h3>
                <p className="launchText">We're doing super cool things, and we think you would like it too. </p>
                <p className="launchText">It's going to be easy to use, simple and automated!</p>
                <h3 > Want to be the first to know when we launch? </h3>
                {this.renderEmailButton}
                <h4 className="cool"> Or hit this button to let us know we're doing something electric!</h4>
                <button className="cool"> <i className="fas fa-bolt"></i></button>
            </div>
        )
    }
}
export default SignUp;
