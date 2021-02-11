import React, { Component } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../../styles/gpost.css'
class GetPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getp: [],
    };
    this.rc = this.rc.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/upv/")
      .then((res) => {
        this.setState({ getp: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  }

  rc() {
    window.setTimeout(() => {
      window.history.go(0);
    }, 10);
  }

  render() {
    const idp = this.state.getp.map((items) => {
      return items.id;
    });
    const p = this.state.getp.map((items) => {
      return (
        <li key={items.id}>
          <Link
            to={{
              pathname: `/pv/${items.id}/${items.title}/${items.user}/`,
              state: { getp: idp },
            }}
            onClick={this.rc}
            className='gpost-link'
          >
            {items.title}
            <br />
            <br />
          </Link>
        </li>
      );
    });

    return (
      <Router>
        <div className='grid-container-getposts'>
          <ul className='gpost-ul'>{p}</ul>
        </div>
      </Router>
    );
  }
}

export default GetPosts;
