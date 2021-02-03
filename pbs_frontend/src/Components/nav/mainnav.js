import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "../routes/posts";
import Register from "../user/register";
import Login from "../user/login";
import Cookies from "js-cookie";
import PostView from "../routes/pv";
import SeePosts from "../routes/sposts";
import ReplyPosts from '../routes/rposts';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    const l =
      (Cookies.remove("refresh_token"),
      Cookies.remove("access_token"),
      Cookies.remove("password"),
      Cookies.set("loged_in", false),
      localStorage.clear(),
      window.setTimeout(() => {
        window.history.go(0);
      }, 1000));
    return l;
  }

  render() {
    const usr_id = localStorage.getItem("user_id");
    return (
      <Router>
        <div>
          {usr_id ? (
            <nav>
              <Link to={"/"}>Home</Link>
              <Link to={"/posts/"}>Post</Link>
              <Link to={'/sp/'}>See Posts</Link>
              <button onClick={this.logout}>Logout</button>
            </nav>
          ) : (
            <nav>
              <Link to={"/"}>Home</Link> <Link to={"/posts/"}>Post</Link>
              <Link to={"/login/"}>Login</Link>
              <Link to={'/sp/'}>See Posts</Link>
            </nav>
          )}
        </div>
        <Switch>
          <Route exact path={"/posts/"} component={Posts} />
          <Route exact path={"/"} />
          <Route exact path={"/register/"} component={Register} />
          <Route exact path={"/login/"} component={Login} />
          <Route exact path={"/pv/:id/:title/"} component={PostView} />
          <Route exact path={"/sp/"} component={SeePosts} />
          <Route exact path={'/rp/:id/:title/'} component={ReplyPosts} />
        </Switch>
      </Router>
    );
  }
}

export default MainNav;
