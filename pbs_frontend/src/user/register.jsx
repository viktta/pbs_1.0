import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      profile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this)
  }

  handleFileSubmit(e) {
    this.setState({ profile: e.target.files[0] });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);

    axios.post("api/uploadfile", formData);
  };

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const profile = this.state.profile;
    axios
      .post("http://127.0.0.1:8000/api/uc/", {
        username,
        email,
        password,
        profile,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        Signup
        <form onSubmit={this.handleSubmit} className="signup-form">
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Enter Username"
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter Email"
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="8 characters or more"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={this.onFileUpload}>
          <input name='profile' value={this.state.profile} onChange={this.handleFileSubmit} placeholder='enter file'></input>
          <button type='submit'></button>
        </form>
      </div>
    );
  }
}
export default Signup;
