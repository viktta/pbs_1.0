import React, { Component } from "react";
import Login from "./user/login";
import Signup from "./user/register";
import axiosInstance from "./axiosApi";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";
import Posts from "./routes/post";
import EditUser from "./user/editUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: Cookies.get("refresh_token"),
      user_id: Cookies.get("id"),
      username: Cookies.get("username"),
      first_name: Cookies.get("first_name"),
      last_name: Cookies.get("last_name"),
      email: Cookies.get("email"),
    };
  }

  async handleLogout(e) {
    try {
      const response = await axiosInstance.post("/ltv/", {
        refresh_token: Cookies.get("refresh_token"),
      });
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("user_id");

      axiosInstance.defaults.headers["Authorization"] = null;
      window.setTimeout(() => {
        window.history.go(0);
      }, 1000);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Router>
        <div className="site">
          {this.state.refresh ? (
            <nav>
              <Link className="nav-link-home" to={"/"}>
                Home
              </Link>
              <Link to={"/posts/"} className="nav-link-posts">post</Link>
              <Link
                className="nav-link-logout"
                onClick={this.handleLogout}
                to={""}
              >
                Logout
              </Link>
              <EditUser />
            </nav>
          ) : (
            <nav>
              <Link className="nav-link-home" to={"/"}>
                Home
              </Link>
              <Link className="nav-link-login" to={"/login/"}>
                Login
              </Link>
              <Link className="nav-link-signup" to={"/signup/"}>
                Signup
              </Link>
            </nav>
          )}

          <Switch>
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/signup/"} component={Signup} />
            <Route exact path={"/"} />
            <Route exact path={"/posts/"} component={Posts} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
