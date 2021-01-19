import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  handleFileSubmit(e) {
    this.setState({ profile: e.target.files[0] });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, email, first_name, last_name } = this.state;
    axios
      .post("http://127.0.0.1:8000/api/uc/", {
        username,
        email,
        password,
        first_name,
        last_name,
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        Signup
        <form onSubmit={this.handleSubmit} className="signup-form">
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Enter Username"
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter Email"
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="8 characters or more"
            />
          </label>
          <label>
            first name:
            <input
              name="first_name"
              type="text"
              value={this.state.first_name}
              onChange={this.handleChange}
              placeholder="enter first name"
            ></input>
          </label>
          <label>
            last name:
            <input
              name="last_name"
              type="text"
              value={this.state.last_name}
              onChange={this.handleChange}
              placeholder="enter last name"
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default Signup;
