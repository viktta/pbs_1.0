import React, { Component } from "react";
import axios from "axios";

class ReplyPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      post: props.match.params.id,
      title: props.match.params.title,
    };
    this.postReply = this.postReply.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  postReply(e) {
    e.preventDefault();
    const { reply, post, title } = this.state;
    axios
      .post("http://localhost:8000/api/rpv/", {
        reply,
        post,
      })
      .then((res) => {
        window.setTimeout(() => {
          this.props.history.push(`/pv/${post}/${title}`);
          window.history.go(0);
        }, 1000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.postReply}>
          <textarea
            name="reply"
            value={this.state.reply}
            onChange={this.handleChange}
            placeholder="reply"
          ></textarea>
          <button type="submit">post</button>
        </form>
      </div>
    );
  }
}

export default ReplyPosts;
