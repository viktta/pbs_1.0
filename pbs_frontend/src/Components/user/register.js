import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/register.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			first_name: '',
			last_name: '',
			email: ''
		};
		this.handleChangeOnUserInput = this.handleChangeOnUserInput.bind(this);
		this.userSignUp = this.userSignUp.bind(this);
	}

	handleChangeOnUserInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	userSignUp(e) {
		e.preventDefault();
		const { username, password, first_name, last_name, email } = this.state;
		axios
			.post('http://localhost:8000/api/uc/', {
				username,
				password,
				first_name,
				last_name,
				email
			})
			.then((res) => {
				console.log(res);
				window.setTimeout(() => {
					window.history.go(0);
				}, 1000);
				this.props.history.push('/login/');
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		return (
			<div className="register-main">
				<form onSubmit={this.userSignUp}>
					<input
						name="username"
						value={this.state.username}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter username"
						type="text"
						className="username-register"
					/>
					<br />
					<br />
					<input
						name="password"
						value={this.state.password}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter password"
						type="password"
						className="password-register"
					/>
					<br />
					<br />
					<input
						name="email"
						value={this.state.email}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter email"
						type="email"
						className="email-register"
					/>
					<br />
					<br />
					<input
						name="first_name"
						value={this.state.first_name}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter first name"
						type="text"
						className="firstname-register"
					/>
					<br />
					<br />
					<input
						name="last_name"
						value={this.state.last_name}
						onChange={this.handleChangeOnUserInput}
						placeholder="enter last name"
						type="text"
						className="lastname-register"
					/>
					<br />

					<br />
					<button type="submit" className="r-b">
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default Register;
