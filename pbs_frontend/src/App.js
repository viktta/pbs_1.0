import axios from "axios";
import React, { Fragment, useEffect } from "react";
import MainNav from "./Components/nav/mainnav";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    const access = Cookies.get("access_token");
    const refresh = Cookies.get("refresh_token");
    const inFiveMin = new Date(new Date().getTime() + 5 * 60 * 1000);
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("user_id");

    if (access === undefined) {
      const getAccess = async () => {
        const res = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          {
            refresh,
          }
        );
        Cookies.set("access_token", res.data.access, { expires: inFiveMin });
      };
      getAccess();
    } else {
      //null
    }

    if (refresh === undefined) {
      const username = localStorage.getItem("username");
      const password = Cookies.get("password");
      const getRefresh = async () => {
        const res = await axios.post("http://localhost:8000/api/gtv/", {
          username,
          password,
        });
        Cookies.set("refresh_token", res.data.refresh, { expires: 15 });
      };
      getRefresh();
    } else {
      //null
    }

    if (username === null) {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:8000/api/uv/${id}/`);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        Cookies.set("password", res.data.password);
      };
      fetchData();
    } else {
      //null
    }
  }, []);
  return (
    <Fragment>
      <div>
        <MainNav />
      </div>
    </Fragment>
  );
}

export default App;
