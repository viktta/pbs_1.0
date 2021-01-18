import { Component } from "react";
import "../styles/edituser.css";
import Cookies from "js-cookie";
import axios from "axios";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_c: true,
      usr_d: [Cookies.get()],
      username: "",
      id: Cookies.get("user_id"),
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateUserTest = this.updateUserTest.bind(this);
  }

  openForm() {
    this.setState({ f_c: false });
  }
  closeForm() {
    this.setState({ f_c: true });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateUserTest(e) {
    e.preventDefault();
    const { username, id } = this.state;
    axios.put(`http://localhost:8000/api/uv/${id}/`, {
      username,
    });
  }

  render() {
    const usr_d = this.state.usr_d;
    const usr_m = usr_d.map((items) => {
      return (
        <li key={items.user_id}>
          username: {items.username} <br /> <br />
          profile: {items.profile}
          <br /> <br />
          first name: {items.first_name} <br /> <br />
          last name: {items.last_name} <br /> <br />
          user id: {items.user_id} <br /> <br />
          email: {items.email} <br /> <br />
          password: {items.password}
        </li>
      );
    });
    return (
      <div className="form-popup" id="myForm">
        {this.state.f_c ? (
          <div className="form-container">
            <button className="open-button" onClick={this.openForm}>
              edit User
            </button>
          </div>
        ) : (
          <div className="form-container">
            <ul>{usr_m}</ul>
            <button
              type="button"
              className="btn cancel"
              onClick={this.closeForm}
            >
              Close
            </button>
          </div>
        )}
        <div>
          <form onSubmit={this.updateUserTest}>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="change username"
            ></input>
            <button type="submit">put</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditUser;
