import React, { Component } from "react";
import axios from "axios";

class ReplyPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      post: props.match.params.id,
      title: props.match.params.title,
      user: localStorage.getItem('user_id'),
    };
    this.postReply = this.postReply.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  postReply(e) {
    e.preventDefault();
    const { reply, post, user } = this.state;
    axios
      .post("http://localhost:8000/api/rpv/", {
        reply,
        post,
        user,
      })
      .then((res) => {
        window.setTimeout(() => {
          this.props.history.push('/sp/');
          window.history.go(0);
        }, 1000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const title = this.state.title;

    return (
      <div>
        <h1>title: {title}</h1>
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
