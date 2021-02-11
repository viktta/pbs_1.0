import axios from "axios";
import React, { Component } from "react";
import "../../styles/post.css";
class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      user: localStorage.getItem("user_id"),
    };
    this.setPost = this.setPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setPost(e) {
    const { title, body, user } = this.state;
    axios
      .post("http://localhost:8000/api/ucpv/", {
        title,
        body,
        user,
      })
      .then((res) => {
        //pass
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className='grid-container-posts'>
        <form onSubmit={this.setPost} className="post-form">
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="post title"
            className="title-form"
          ></input>
          <br />
          <br />
          <input
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="post body"
            className="body-form"
          ></input>
          <br />
          <br />
          <button type="submit" className="form-button">
            post
          </button>
        </form>
      </div>
    );
  }
}
export default Posts;
