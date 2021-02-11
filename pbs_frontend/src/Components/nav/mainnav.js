import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "../routes/posts";
import Register from "../user/register";
import Login from "../user/login";
import Cookies from "js-cookie";
import PostView from "../routes/pv";
import SeePosts from "../routes/sposts";
import ReplyPosts from "../routes/rposts";
import '../../styles/main_nav.css'

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
        <div className='grid-container-mainnav'>
          {usr_id ? (
            <nav className="main-nav">
              <Link to={"/"} className="home-nav">
                Home
              </Link>
              <Link to={"/posts/"} className="post-nav">
                Post
              </Link>
              <Link to={"/sp/"} className="sp-nav">
                See Posts
              </Link>
              <button onClick={this.logout} className="logout-nav">
                Logout
              </button>
            </nav>
          ) : (
            <nav className="main-nav">
              <Link to={"/"} className="home-nav">
                Home
              </Link>{" "}
              <Link to={"/posts/"} className="post-nav">
                Post
              </Link>
              <Link to={"/login/"} className="login-nav">
                Login
              </Link>
              <Link to={"/sp/"} className="sp-nav">
                See Posts
              </Link>
            </nav>
          )}
        </div>
        <Switch>
          <Route exact path={"/posts/"} component={Posts} />
          <Route exact path={"/"} />
          <Route exact path={"/register/"} component={Register} />
          <Route exact path={"/login/"} component={Login} />
          <Route exact path={"/pv/:id/:title/:user/"} component={PostView} />
          <Route exact path={"/sp/"} component={SeePosts} />
          <Route exact path={"/rp/:id/:title/"} component={ReplyPosts} />
        </Switch>
      </Router>
    );
  }
}

export default MainNav;
