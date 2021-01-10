import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: '1'
    };
    this.postT = this.postT.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postT(e) {
    e.preventDefault();
    const { title, body, user } = this.state;
    axios
      .post("http://localhost:8000/api/posts/", {
        title,
        body,
        user
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.postT}>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <input
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          ></input>
          <button type="submit">post</button>
        </form>
        <h1>test</h1>
      </div>
    );
  }
}

export default App;
