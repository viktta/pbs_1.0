import React, { Component } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import '../../styles/gpost.css';
class GetPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			get_posts: []
		};
		this.reloadPage = this.reloadPage.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:8000/api/upv/')
			.then((res) => {
				this.setState({ get_posts: res.data });
			})
			.catch((err) => {
				alert(err);
			});
	}

	reloadPage() {
		window.setTimeout(() => {
			window.history.go(0);
		}, 10);
	}

	render() {
		const get_posts_id = this.state.get_posts.map((items) => {
			return items.id;
		});
		const posts = this.state.get_posts.map((items) => {
			return (
				<li key={items.id}>
					<Link
						to={{
							pathname: `/pv/${items.id}/${items.title}/${items.user}/`,
							state: { getp: get_posts_id }
						}}
						onClick={this.reloadPage}
						className="gpost-link"
					>
						{items.title}
						<br />
						<br />
					</Link>
				</li>
			);
		});

		return (
			<Router>
				<div className="grid-container-getposts">
					<ul className="gpost-ul">{posts}</ul>
				</div>
			</Router>
		);
	}
}

export default GetPosts;
