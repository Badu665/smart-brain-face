import React, { useState } from "react";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      errorMessage: "",
      showError: false,
    };
    this.timeoutId = null; // To store the timeout ID for clearing
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    const email = this.state.signInEmail;
    const password = this.state.signInPassword;

    if (email.length === 0 || password.length === 0) {
      /*    displayError("Incorrect Email or Password"); */
      this.setState({ showError: true });
      this.setState({ errorMessage: "Incorrect Email or Password" });

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Set a timeout to hide the error message after 5 seconds
      this.timeoutId = setTimeout(() => {
        this.setState({ showError: false });
      }, 5000); // 5000 milliseconds = 5 seconds

      return;
    }
    /* Some Comments */

    fetch("https://smartbrainapi-194f32d9fc02.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data === "Error") {
            this.setState({ showError: true });
            this.setState({ errorMessage: "Incorrect Email or Password" });

            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
            }

            // Set a timeout to hide the error message after 5 seconds
            this.timeoutId = setTimeout(() => {
              this.setState({ showError: false });
            }, 5000); // 5000 milliseconds = 5 seconds

            return;
          }

          const userStatus = "signin";
       
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        } else {
          this.setState({ showError: true });
          this.setState({ errorMessage: "Incorrect Email or Password" });

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }

          // Set a timeout to hide the error message after 5 seconds
          this.timeoutId = setTimeout(() => {
            this.setState({ showError: false });
          }, 5000); // 5000 milliseconds = 5 seconds

          return;
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    const { showError } = this.state;
    const { errorMessage } = this.state;

    return (
      <article className="center br3 mw5 mw6-ns hidden ba shadow-5 mv4">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
          {showError && (
            <div className="error-message blinking-text">{errorMessage}</div>
          )}
          <div className=" mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link  black db pointer"
            >
              Register
            </p>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
