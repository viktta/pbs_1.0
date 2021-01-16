import { Component } from "react";
import axiosInstance from "../axiosApi";
import Cookies from "js-cookie";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: Cookies.get("user_id"),
    };
    this.Post = this.Post.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  Post(e) {
    e.preventDefault();
    const { title, body, user } = this.state;
    axiosInstance.post("/ucpv/", {
      title,
      body,
      user,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.Post}>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="title"
          ></input>
          <textarea
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          ></textarea>
          <img alt="user-profile"></img>
          <button type="submit">post</button>
        </form>
      </div>
    );
  }
}

export default Posts;