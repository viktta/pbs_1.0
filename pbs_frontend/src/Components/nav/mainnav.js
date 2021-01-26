import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "../routes/posts";
import Register from "../user/register";
import Login from "../user/login";
import Cookies from "js-cookie";

function MainNav(props) {
  const usr_id = localStorage.getItem("user_id");
  const logout = () => {
    try {
      const userLogout = async () => {
        const ul =
          (await Cookies.remove("refresh_token"),
          Cookies.remove("access_token"),
          Cookies.remove("password"),
          localStorage.clear());
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
        return ul;
      };
      userLogout();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Router>
      <div>
        {usr_id ? (
          <nav>
            <Link to={"/"}>Home</Link> <Link to={"/posts/"}>Posts</Link>{" "}
            <button onClick={logout}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to={"/"}>Home</Link> <Link to={"/posts/"}>Posts</Link>{" "}
            <Link to={"/login/"}>Login</Link>
          </nav>
        )}
      </div>
      <Switch>
        <Route exact path={"/posts/"} component={Posts} />
        <Route exact path={"/"} />
        <Route exact path={"/register/"} component={Register} />
        <Route exact path={"/login/"} component={Login} />
      </Switch>
    </Router>
  );
}

export default MainNav;
