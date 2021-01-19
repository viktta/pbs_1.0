import { Component } from "react";
import axiosInstance from "../axiosApi";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: Cookies.get("refresh_token"),
      user_info_data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getUserId(e) {
    const token = Cookies.get("refresh_token");
    const decode = jwt_decode(token);
    Cookies.set("user_id", decode.user_id);
  }

  handleSubmit(event) {
    event.preventDefault();
    axiosInstance
      .post("/gtv/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + result.data.access;
        Cookies.set("access_token", result.data.access);
        Cookies.set("refresh_token", result.data.refresh, { expires: 15 });
      })
      .then(() => {
        this.getUserId();
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
      })
      .then(() => {})
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit} className="login-form">
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
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter Password"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default Login;
