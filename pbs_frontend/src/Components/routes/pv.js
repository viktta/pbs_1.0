import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_id: props.match.params.id,
      p_d_id: [],
      title: props.match.params.title,
    };
  }

  componentDidMount() {
    const title = this.state.title;
    localStorage.setItem("uv_o", true);
    axios
      .get(`http://localhost:8000/api/upv/${title}`)
      .then((res) => {
        this.setState({ p_d_id: [res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const url_id = this.state.url_id;
    const p_d_id = this.state.p_d_id;
    const idp = this.state.url_id;
    const u = p_d_id.map((i) => {
      return (
        <div>
          <h1>title: {i.title}</h1>
          <h1>body: {i.body}</h1>
        </div>
      );
    });

    return (
      <div>
        {url_id ? <div>{u}</div> : <h1>Nope</h1>}
        <Link
          to={{
            pathname: `/rp/${this.state.url_id}/${this.state.title}/`,
            state: { getp: idp },
          }}
        >Reply</Link>
      </div>
    );
  }
}

export default PostView;
