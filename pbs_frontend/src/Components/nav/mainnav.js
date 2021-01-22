import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "../routes/posts";

function MainNav() {
  return (
    <Router>
      <div>
        <nav>
          <Link to={"/posts/"}>Posts</Link>
          <Link to={'/'}>Home</Link>
        </nav>
      </div>
      <Switch>
        <Route exact path={"/posts/"} component={Posts} />
        <Route exact path={"/"} />
      </Switch>
    </Router>
  );
}

export default MainNav;
