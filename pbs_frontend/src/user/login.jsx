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
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getUserId(e) {
    const token = Cookies.get("refresh_token");
    const decode = jwt_decode(token);
    Cookies.set("user_id", decode.user_id);
  }

  componentDidMount() {
    const username = Cookies.get("username");
    if (username) {
      //pass
    } else {
      this.getUserInfo();
    }
  }

  getUserInfo(e) {
    const id = Cookies.get("user_id");
    axios
      .get("http://127.0.0.1:8000/api/urv/" + id)
      .then((res) => {
        const username = res.data.map((username) => {
          return username.username;
        });
        const password = res.data.map((password) => {
          return password.password;
        });
        const last_login = res.data.map((last_login) => {
          return last_login.last_login;
        });
        const is_superuser = res.data.map((is_superuser) => {
          return is_superuser.is_superuser;
        });
        const first_name = res.data.map((first_name) => {
          return first_name.first_name;
        });
        const last_name = res.data.map((last_name) => {
          return last_name.last_name;
        });
        const email = res.data.map((email) => {
          return email.email;
        });
        const is_staff = res.data.map((is_staff) => {
          return is_staff.is_staff;
        });
        const is_active = res.data.map((is_active) => {
          return is_active.is_active;
        });
        const date_joined = res.data.map((date_joined) => {
          return date_joined.date_joined;
        });
        const profile = res.data.map((profile) => {
          return profile.profile;
        });
        Cookies.set("username", username);
        Cookies.set("password", password);
        Cookies.set("last_login", last_login);
        Cookies.set("is_superuser", is_superuser);
        Cookies.set("first_name", first_name);
        Cookies.set("last_name", last_name);
        Cookies.set("email", email);
        Cookies.set("is_staff", is_staff);
        Cookies.set("is_active", is_active);
        Cookies.set("date_joined", date_joined);
        Cookies.set("profile", profile);
      })
      .then(() => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      })
      .catch((err) => {
        console.log(err);
      });
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
