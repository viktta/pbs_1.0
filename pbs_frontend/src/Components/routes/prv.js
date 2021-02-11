import React, { Component } from "react";
import axios from "axios";
import "../../styles/prv.css";
class ReplyPostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r_data: [],
      id: props.id,
      r_id: [],
      title: props.title,
    };
  }

  componentDidMount() {
    const id = this.state.id;
    axios.get(`http://localhost:8000/api/rpv/${id}`).then((res) => {
      this.setState({ r_data: res.data });
    });
  }

  render() {
    const { r_data, r_id } = this.state;
    const u = r_data.map((i) => {
      return (
        <li key={i.id} className="prv-list">
          <h1 className="prv-h1-body">body: {i.reply}</h1> <br />{" "}
          <h1 className="prv-h1-user">user: {i.user}</h1> <br />
          <h1 className="prv-h1-date">
            {i.date_added} <br />{" "}
          </h1>
        </li>
      );
    });

    return (
      <div>
        <ul>{u}</ul>
      </div>
    );
  }
}

export default ReplyPostView;
