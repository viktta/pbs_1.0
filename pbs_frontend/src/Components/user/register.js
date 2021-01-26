import React, { useState } from "react";
import axios from "axios";
import "../../styles/register.css";
function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const userRegister = (e) => {
    e.preventDefault();
    const createUser = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/uc/", {
          username,
          password,
          first_name,
          last_name,
          email,
        });
        console.log(res);
        window.setTimeout(() => {
          window.history.go(0);
        }, 1000);
        props.history.push("/login/");
      } catch (err) {
        alert(err);
      }
    };

    createUser();
  };

  return (
    <div className="register-main">
      <form onSubmit={userRegister}>
        <input
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="enter username"
          type="text"
        ></input>
        <br />
        <br />
        <input
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="enter password"
          type="password"
        ></input>
        <br />
        <br />
        <input
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="enter email"
          type="email"
        ></input>
        <br />
        <br />
        <input
          name="first_name"
          value={first_name}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="enter first name"
          type="text"
        ></input>
        <br />
        <br />
        <input
          name="last_name"
          value={last_name}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="enter last name"
          type="text"
        ></input>
        <br />

        <br />
        <button type="submit" className="r-b">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
