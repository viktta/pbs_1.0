import axios from 'axios';
import React, { Component } from 'react';
import MainNav from './Components/nav/mainnav';
import Cookies from 'js-cookie';
import './styles/app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const access = Cookies.get('access_token');
		const refresh = Cookies.get('refresh_token');
		const username = localStorage.getItem('username');
		const inFiveMin = new Date(new Date().getTime() + 5 * 60 * 1000);
		const id = localStorage.getItem('user_id');
		const loged = Cookies.get('loged_in');
		if (access === undefined && loged) {
			axios
				.post('http://localhost:8000/api/token/refresh/', {
					refresh
				})
				.then((res) => {
					Cookies.set('access_token', res.data.access, { expires: inFiveMin });
					Cookies.set('refresh_token', res.data.refresh, { expires: 15 });
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			//null
		}

		if (refresh === undefined && loged === true) {
			const username = localStorage.getItem('username');
			const password = Cookies.get('password');
			axios
				.post('http://localhost:8000/api/gtv/', {
					username,
					password
				})
				.then((res) => {
					Cookies.set('refresh_token', res.data.refresh, { expires: 15 });
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			//null
		}

		if (username === null && loged === true) {
			axios
				.get(`http://localhost:8000/api/uv/${id}/`, {
					headers: {
						Authorization: 'JWT ' + Cookies.get('access_token')
					}
				})
				.then((res) => {
					localStorage.setItem('username', res.data.username);
					localStorage.setItem('email', res.data.email);
					localStorage.setItem('first_name', res.data.first_name);
					localStorage.setItem('last_name', res.data.last_name);
					Cookies.set('password', res.data.password);
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			//null
		}
	}
	render() {
		return (
			<div>
				<MainNav />
			</div>
		);
	}
}

export default App;
