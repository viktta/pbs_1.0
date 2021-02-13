import axios from 'axios';
import React, { Component } from 'react';
import '../../styles/post.css';
import Cookies from 'js-cookie';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post_title: '',
			post_body: '',
			user: localStorage.getItem('user_id')
		};
		this.saveUserCreatedPosts = this.saveUserCreatedPosts.bind(this);
		this.handleChangeOnUserInput = this.handleChangeOnUserInput.bind(this);
	}

	handleChangeOnUserInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	saveUserCreatedPosts(e) {
		const title = this.state.post_title;
		const body = this.state.post_body;
		const user = this.state.user;

		axios.post('http://localhost:8000/api/ucpv/', {
			title,
			body,
			user
		});
	}

	render() {
		const loged_in = Cookies.get('loged_in');

		return (
			<div className="grid-container-posts">
				{loged_in ? (
					<form onSubmit={this.saveUserCreatedPosts} className="post-form">
						<input
							name="post_title"
							value={this.state.post_title}
							onChange={this.handleChangeOnUserInput}
							placeholder="post title"
							className="title-form"
						/>
						<br />
						<br />
						<input
							name="post_body"
							value={this.state.post_body}
							onChange={this.handleChangeOnUserInput}
							placeholder="post body"
							className="body-form"
						/>
						<br />
						<br />
						<button type="submit" className="form-button">
							post
						</button>
					</form>
				) : (
					<h1 className='post-error'>You need to log in to use this function</h1>
				)}
			</div>
		);
	}
}
export default Posts;
