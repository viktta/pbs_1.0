import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/login.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.userLogin = this.userLogin.bind(this);
		this.handleChangeOnUserInput = this.handleChangeOnUserInput.bind(this);
	}

	handleChangeOnUserInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	userLogin(e) {
		e.preventDefault();
		const { username, password } = this.state;
		axios
			.post('http://localhost:8000/api/gtv/', {
				username,
				password
			})
			.then((res) => {
				const inFiveMin = new Date(new Date().getTime() + 5 * 60);
				Cookies.set('refresh_token', res.data.refresh, { expires: 15 });
				Cookies.set('access_token', res.data.access, { expires: inFiveMin });
				const token = Cookies.get('refresh_token');
				const decode = jwt_decode(token);
				localStorage.setItem('user_id', decode.user_id);
				Cookies.set('loged_in', true);
				window.setTimeout(() => {
					this.props.history.push('/');
					window.history.go(0);
				}, 1000);
			})
			.catch(() => {
				alert('Wrong email or password, Please try again');
			});
	}

	render() {
		return (
			<div className="login-main">
				<form onSubmit={this.userLogin}>
					<input
						name="username"
						value={this.state.username}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter username"
						type="text"
						className="username-login"
					/>
					<br />
					<br />
					<input
						name="password"
						value={this.state.password}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter password"
						type="password"
						className="password-login"
					/>
					<br />
					<br />
					<button type="submit" className="login-button">
						Login
					</button>
					<Link to={'/register/'} className="register-button">
						Register
					</Link>
				</form>
			</div>
		);
	}
}

export default Login;
