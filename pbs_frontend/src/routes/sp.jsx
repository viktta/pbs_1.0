import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class SeePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/upv/")
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const posts = this.state.posts;
    const p_m = posts.map((items) => {
      return (
        <li key={items.id}>
          <Link to={"/ssp/"}>{items.title}</Link>
        </li>
      );
    });
    return (
      <div>
        <ul>{p_m}</ul>
      </div>
    );
  }
}

export default SeePosts;
