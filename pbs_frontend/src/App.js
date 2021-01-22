import axios from "axios";
import React, { useState, Fragment } from "react";
import MainNav from "./Components/nav/mainnav";

function App() {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/upv/");
      setPosts(res.data);
    };
    fetchData();
  };
  const l = posts.map((items) => {
    return <li key={items.id}>{items.title}</li>;
  });

  return (
    <Fragment>
      <div>
        <MainNav />
      </div>
      <div>
        <ul>{l}</ul>
        <button onClick={getPosts}>get</button>
      </div>
    </Fragment>
  );
}

export default App;
