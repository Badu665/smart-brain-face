import React from "react";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      name: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
    if (messageElement.textContent.length > 0) {
      const messageElement = document.getElementById("error");
      messageElement.textContent = "";
    }

    console.log("You are in on email change");
    if (messageElement.textContent.length > 0) {
  /*     console.log("It is greater than 0"); */
      messageElement.innerHTML = "rtyyu";
    }
  };

  /* Some Comments */

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onSubmitSignIn = () => {
    const email = this.state.signInEmail;
    const password = this.state.signInPassword;
    const name = this.state.name;

    if (email.length === 0 || password.length === 0 || name === "") {
      /*    displayError("Incorrect Email or Password"); */
      this.setState({ showError: true });
      this.setState({ errorMessage: "Incorrect Data Entry" });

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Set a timeout to hide the error message after 5 seconds
      this.timeoutId = setTimeout(() => {
        this.setState({ showError: false });
      }, 5000); // 5000 milliseconds = 5 seconds

      return;
    }

    if (password.length < 7) {
      /*    displayError("Incorrect Email or Password"); */
      this.setState({ showError: true });
      this.setState({
        errorMessage: "Password Must be more than 7 characters",
      });

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Set a timeout to hide the error message after 5 seconds
      this.timeoutId = setTimeout(() => {
        this.setState({ showError: false });
      }, 5000); // 5000 milliseconds = 5 seconds

      return;
    }

    fetch("https://smartbrainapi-194f32d9fc02.herokuapp.com/register", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (response === "Error") {
          this.setState({ showError: true });
          this.setState({ errorMessage: "Incorrect Email" });

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }

          // Set a timeout to hide the error message after 5 seconds
          this.timeoutId = setTimeout(() => {
            this.setState({ showError: false });
          }, 5000); // 5000 milliseconds = 5 seconds

          return;
        }

        if (response === "You have been registered") {
          const registeredUser = {
            name: name,
            email: email,
            entries: 0,
          };
          this.props.loadUser(registeredUser);
          this.props.onRouteChange("home");
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
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
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
              {showError && (
                <div className="error-message blinking-text">
                  {errorMessage}
                </div>
              )}
            </fieldset>

            <div className="lh-copy mt3">
              <p
                onClick={this.onSubmitSignIn}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
