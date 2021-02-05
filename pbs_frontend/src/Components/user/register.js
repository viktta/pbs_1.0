import React, { Component } from "react";
import axios from "axios";
import "../../styles/register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.userRegister = this.userRegister.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  userRegister(e) {
    e.preventDefault();
    const { username, password, first_name, last_name, email } = this.state;
    axios
      .post("http://localhost:8000/api/uc/", {
        username,
        password,
        first_name,
        last_name,
        email,
      })
      .then((res) => {
        console.log(res);
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
        this.props.history.push("/login/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="register-main">
        <form onSubmit={this.userRegister}>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="enter username"
            type="text"
          ></input>
          <br />
          <br />
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="enter password"
            type="password"
          ></input>
          <br />
          <br />
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="enter email"
            type="email"
          ></input>
          <br />
          <br />
          <input
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
            placeholder="enter first name"
            type="text"
          ></input>
          <br />
          <br />
          <input
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
            placeholder="enter last name"
            type="text"
          ></input>
          <br />

          <br />
          <button type="submit" className="r-b">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
