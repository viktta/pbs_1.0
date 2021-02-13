import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/prv.css';

class ReplyPostView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reply_data: [],
			id: props.id,
			reply_id: [],
		};
	}

	componentDidMount() {
		const id = this.state.id;

		axios.get(`http://localhost:8000/api/rpv/${id}`).then((res) => {
			this.setState({ reply_data: res.data });
		});
	}

	render() {
		const { reply_data } = this.state;
		const user_post_reply = reply_data.map((i) => {
			return (
				<div className="prv-list">
					<li key={i.id}>
						<h1 className="prv-h1-user">user: {i.user}</h1> <br />
						<p className="prv-h1-body">{i.reply}</p> <br />
						<h1 className="prv-h1-date">
							{i.date_added} <br />
						</h1>
					</li>
				</div>
			);
		});

		return (
			<div>
				<ul>{user_post_reply}</ul>
			</div>
		);
	}
}

export default ReplyPostView;
