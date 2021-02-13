import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/rp.css';

class ReplyPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_post_reply: '',
			post_id: props.match.params.id,
			post_title: props.match.params.title,
			user: localStorage.getItem('user_id')
		};
		this.postUserComment = this.postUserComment.bind(this);
		this.handleChangeOnUserInput = this.handleChangeOnUserInput.bind(this);
	}

	handleChangeOnUserInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	postUserComment(e) {
		e.preventDefault();
		const reply = this.state.user_post_reply;
		const post = this.state.post_id;
		const user = this.state.user;
		axios
			.post('http://localhost:8000/api/rpv/', {
				reply,
				post,
				user
			})
			.then((res) => {
				window.setTimeout(() => {
					this.props.history.push('/sp/');
					window.history.go(0);
				}, 1000);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const post_title = this.state.post_title;

		return (
			<div className="grid-container-rp">
				<h1 className="rp-title">title: {post_title}</h1>
				<form onSubmit={this.postUserComment} className="rp-form">
					<textarea
						name="user_post_reply"
						value={this.state.user_post_reply}
						onChange={this.handleChangeOnUserInput}
						placeholder="reply"
						className="rp-ta"
					/>
					<br />
					<br />
					<button type="submit" className="rp-form-button">
						post
					</button>
				</form>
			</div>
		);
	}
}

export default ReplyPosts;
