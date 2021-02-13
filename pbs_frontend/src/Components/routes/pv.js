import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReplyPostView from './prv';
import '../../styles/pv.css';

class PostView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post_id: props.match.params.id,
			post_data: [],
			post_title: props.match.params.title,
			id: localStorage.getItem('user_id'),
			post_user_id: props.match.params.user,
			username_of_post_creator: [],
			reply: true
		};
	}

	componentDidMount() {
		const user = this.state.post_user_id;
		const title = this.state.post_title;
		localStorage.setItem('uv_o', this.state.reply);
		axios
			.get(`http://localhost:8000/api/upv/${title}`)
			.then((res) => {
				this.setState({
					post_data: [ res.data ]
				});
			})
			.catch((err) => {
				console.log(err);
			});

		axios.get(`http://localhost:8000/api/uv/${user}`).then((res) => {
			this.setState({ username_of_post_creator: res.data.username });
		});
	}

	render() {
		const post_id = this.state.post_id;
		const post_data = this.state.post_data;
		const idp = this.state.post_id;
		const username = this.state.username_of_post_creator;

		const map_post_data = post_data.map((i) => {
			return (
				<div key={i.id} className="grid-container-pv">
					<h1 className="pv-title">{i.title}</h1>
					<h1 className="pv-h1-username">{username}</h1>
					<h1 className="pv-body">
						<textarea readOnly>{i.body}</textarea>
					</h1>
					<Link
						to={{
							pathname: `/rp/${this.state.post_id}/${this.state.post_title}/`,
							state: {
								getp: idp
							}
						}}
						className="pv-link"
					>
						{' '}
						Reply
					</Link>
				</div>
			);
		});

		const reply = this.state.reply;

		return (
			<div>
				{post_id ? <div className="pv-post">{map_post_data}</div> : <h1>Nope</h1>}
				{reply === true ? <ReplyPostView id={this.state.post_id} /> : <h1> . </h1>}
			</div>
		);
	}
}

export default PostView;
