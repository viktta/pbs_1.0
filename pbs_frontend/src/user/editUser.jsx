import { Component } from "react";
import "../styles/edituser.css";
import Cookies from "js-cookie";
import axios from "axios";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_c: true,
      usr_d: [],
      id: Cookies.get("user_id"),
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile: [],
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editUserD = this.editUserD.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
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

  componentDidMount() {
    const { id } = this.state;
    axios
      .get(`http://localhost:8000/api/uv/${id}/`)
      .then((res) => {
        this.setState({ usr_d: [res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios.get(`http://localhost:8000/api/upv/${id}/`)
    .then(res => {
      this.setState({ profile : res.data.profile })
    })
  }



  changeProfilePic(e) {
    e.preventDefault();
    const { profile, id } = this.state;
    axios.patch(`http://localhost:8000/api/upv/${id}/`, {
      profile,
    });
  }

  editUserD(e) {
    e.preventDefault();
    const { username, first_name, last_name, email, password, id } = this.state;
    axios
      .patch(`http://localhost:8000/api/uv/${id}/`, {
        username,
        first_name,
        last_name,
        email,
        password,
      })
      .then(() => {
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const usr_d = this.state.usr_d;
    const usr_m = usr_d.map((items, index) => {
      return (
        <li key={index}>
          username: {items.username} <br /> <br />
          first name: {items.first_name} <br /> <br />
          last name: {items.last_name} <br /> <br />
          user id: {items.id} <br /> <br />
          email: {items.email} <br /> <br />
          password: {items.password}
        </li>
      );
    });
    const usr_m_1 = usr_d.map((items, index) => {
      return (
        <li Key={index}>
          <form onSubmit={this.editUserD}>
            <input
              name="username"
              onChange={this.handleChange}
              placeholder="change username"
              type="text"
            ></input>
            <input
              name="password"
              onChange={this.handleChange}
              placeholder="change password"
              type="password"
            ></input>
            <input
              name="first_name"
              onChange={this.handleChange}
              placeholder="change first name"
              type="text"
            ></input>
            <input
              name="last_name"
              onChange={this.handleChange}
              placeholder="change last_name"
              type="text"
            ></input>
            <input
              name="email"
              onChange={this.handleChange}
              placeholder="change email"
              type="email"
            ></input>
            <button type="submit" className="submit-edit-button">
              change
            </button>
          </form>
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
            <p>
              if you want to change your user's data you have to change it all
            </p>
            <form onSubmit={this.changeProfilePic}>
              <img alt="user profile" src={this.state.profile}></img>
              <input
                onChange={this.onFileChange}
                value={this.state.profile}
                placeholder="change profile pic"
              ></input>
              <button type="submit">change</button>
            </form>
            <ul>
              {usr_m}
              {usr_m_1}
            </ul>
            <button
              type="button"
              className="btn cancel"
              onClick={this.closeForm}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default EditUser;
