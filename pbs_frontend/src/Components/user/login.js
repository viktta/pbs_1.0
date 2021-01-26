import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    const setUser = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/gtv/", {
          username,
          password,
        });
        const inFiveMin = new Date(new Date().getTime() + 5 * 60 * 1000);
        Cookies.set("refresh_token", res.data.refresh, { expires: 15 });
        Cookies.set("access_token", res.data.access, { expires: inFiveMin });
      } catch (err) {
        alert("Wrong email or password, Please try again");
      } finally {
        const token = Cookies.get("refresh_token");
        const decode = jwt_decode(token);
        localStorage.setItem("user_id", decode.user_id);
        window.setTimeout(() => {
          props.history.push("/");
          window.history.go(0);
        }, 1000);
      }
    };

    setUser();
  };

  return (
    <div className="login-main">
      <form onSubmit={loginUser}>
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
        <button type="submit" className="login-button">
          Login
        </button>
        <Link to={"/register/"} className="register-button">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
