import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReplyPostView from "./prv";
import "../../styles/pv.css";

class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url_id: props.match.params.id,
      p_d_id: [],
      title: props.match.params.title,
      id: localStorage.getItem("user_id"),
      user_p_id: props.match.params.user,
      user_p_username: [],
      reply: true,
    };
  }

  componentDidMount() {
    const user = this.state.user_p_id;
    const title = this.state.title;
    localStorage.setItem("uv_o", true);

    axios
      .get(`http://localhost:8000/api/upv/${title}`)

      .then((res) => {
        this.setState({
          p_d_id: [res.data],
        });
      })

      .catch((err) => {
        console.log(err);
      });

    axios.get(`http://localhost:8000/api/uv/${user}`).then((res) => {
      this.setState({ user_p_username: res.data.username });
    });
  }

  render() {
    const url_id = this.state.url_id;
    const p_d_id = this.state.p_d_id;
    const idp = this.state.url_id;
    const username = this.state.user_p_username;

    const u = p_d_id.map((i) => {
      return (
        <div key={i.id}>
          <h1 className="pv-title">{i.title}</h1>

          <h1 className="pv-body">{i.body}</h1>
        </div>
      );
    });

    const reply = this.state.reply;

    return (
      <div className="grid-container-pv">
        {url_id ? <div className="pv-post">{u}</div> : <h1>Nope</h1>}
        <h1 className="pv-h1-username">username : {username}</h1>
        <Link
          to={{
            pathname: `/rp / $ {this.state.url_id} / $ {this.state.title} / `,
            state: {
              getp: idp,
            },
          }}
          className="pv-link"
        >
          Reply{" "}
        </Link>{" "}
        {reply === true ? (
          <ReplyPostView id={this.state.url_id} title={this.state.title} />
        ) : (
          <h1> . </h1>
        )}{" "}
      </div>
    );
  }
}

export default PostView;
