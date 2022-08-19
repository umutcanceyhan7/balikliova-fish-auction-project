import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styling/Register.css";
import PopUp from "../popups/PopUp.js";
import "../popups/PopUp.css";
import {
	FaGithub,
	FaPhoneAlt,
	FaHome,
	FaTwitter,
	FaSistrix,
} from "react-icons/fa";

function Register() {
	const [role, setRole] = useState("Customer");
	const [code, setCode] = useState("");
	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	function selectCustomer() {
		setRole("Customer");
	}

	function selectCoopMember() {
		setRole("Cooperative Member");
	}

	// {
	// 	"username": "randomUser",
	// 	"password": "random_psw_123",
	// 	"surname": "iba"
	// 	"name": "cagatay",
	// 	"mail": "random@gmail.com",
	// 	"address": "randomAddress"
	// }
	function handleSubmit(event) {
		event.preventDefault();
		var { username, password, email, name, email, address, surname, code } =
			document.forms[0];
		if (username.value.length < 3) {
			setErrorMessage("Username can not be less than three characters");
			setTrigger(true);
			setTimeout(() => {
				setTrigger(false);
			}, 2000);
			return false;
		} else if (password.value.length < 6) {
			setErrorMessage("Password cannot be less than 6 characters");
			setTrigger(true);
			setTimeout(() => {
				setTrigger(false);
			}, 2000);
			return false;
		} else {
			if (role == "Customer") {
				fetch(`http://190.92.179.153:8080/api/signup/customer`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						username: username.value,
						password: password.value,
						surname: surname.value,
						name: name.value,
						mail: email.value,
						address: address.value,
					}),
				}).then((res) => {
					console.log(res);
					if (res.status == 200) {
						setTrigger(true);
						setErrorMessage("Sign up successful.");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);
					} else if (res.status == 400) {
						setTrigger(true);
						setErrorMessage("Username is already used.");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);
						return false;
					}
				});
				// .then((json) => {
				// 	console.log(json);
				// 	if (json.status == 200) {
				// 		setTrigger(true);
				// 		setErrorMessage("Sign Up Successful!");
				// 		setTimeout(() => {
				// 			setTrigger(false);
				// 			console.log(json);
				// 		}, 2000);
				// 	} else {
				// 		console.log("hata verdi");
				// 	}
				// });
			} else {
				fetch(`http://190.92.179.153:8080/api/signup/member`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						username: username.value,
						password: password.value,
						mail: email.value,
						code: code.value,
					}),
				})
					.then((res) => {
						console.log(res);
						res.json();
						if (res.status == 200) {
							setTrigger(true);
							setErrorMessage("Sign up successful.");
							setTimeout(() => {
								setTrigger(false);
							}, 2000);
						} else if (res.status == 400) {
							setTrigger(true);
							setErrorMessage("Invalid Code");
							setTimeout(() => {
								setTrigger(false);
							}, 2000);
							return false;
						} else {
							return true;
						}
					})
					.then((json) => {
						console.log(json);
						if (json.status == 200) {
							setTrigger(true);
							setErrorMessage("Sign Up Successful!");
							setTimeout(() => {
								setTrigger(false);
								console.log(json);
							}, 2000);
						} else {
							console.log("hata verdi");
						}
					});
			}
		}
	}

	const width = window.innerWidth;
	const height = window.innerHeight;
	return (
		<div
			className="root"
			style={{
				height: height,
				width: width,
				position: "relative",
			}}
		>
			<div
				className="header"
				style={{
					position: "absolute",
					top: "0%",
					fontSize: 25,
					color: "white",
				}}
			>
				<div className="header-block">
					<FaHome
						className="icon"
						style={{
							width: "33%",
							height: "50%",
							color: "#256A98",
						}}
					></FaHome>
				</div>
				<div className="header-block">
					<FaSistrix
						className="icon"
						style={{
							width: "33%",
							height: "50%",
							color: "#256A98",
						}}
					></FaSistrix>
				</div>
				<div className="header-block">
					<FaGithub
						className="icon"
						style={{
							width: "33%",
							height: "50%",
							color: "#256A98",
						}}
					></FaGithub>
				</div>
				<div className="header-block">
					<FaPhoneAlt
						className="icon"
						style={{
							width: "33%",
							height: "50%",
							color: "#256A98",
						}}
					></FaPhoneAlt>
				</div>
			</div>
			<div
				className="box"
				style={{
					width: width / 2.2,
					height: height / 1.4,
					zIndex: 1,
				}}
			>
				{/* <p>Role: {role}</p> */}
				<div className="checkbox">
					<div
						className="checkbox-item"
						style={{
							backgroundColor: role == "Customer" ? "#2d89de" : "white",
							color: role == "Customer" ? "white" : "black",
						}}
						onClick={selectCustomer}
					>
						Customer
					</div>
					<div
						style={{
							backgroundColor:
								role == "Cooperative Member" ? "#2d89de" : "white",
							color: role == "Cooperative Member" ? "white" : "black",
						}}
						className="checkbox-item"
						onClick={selectCoopMember}
					>
						Cooperative Member
					</div>
				</div>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="textInput"
						placeholder="Email"
						type="text"
						name="email"
						required
					/>
					<input
						className="textInput"
						placeholder="Username"
						type="text"
						name="username"
						required
					/>
					<input
						className="textInput"
						placeholder="Password"
						type="password"
						name="password"
						required
					/>
					{role == "Customer" ? (
						<input
							className="textInput"
							placeholder="Name"
							type="text"
							name="name"
							required
						/>
					) : null}

					{role == "Customer" ? (
						<input
							className="textInput"
							placeholder="Surname"
							type="text"
							name="surname"
							required
						/>
					) : null}

					{role == "Customer" ? (
						<input
							className="textInput"
							placeholder="Address"
							type="text"
							name="address"
							required
						/>
					) : null}

					{role == "Cooperative Member" ? (
						<input
							className="textInput"
							placeholder="Cooperative Code"
							type="text"
							name="code"
							required
						/>
					) : null}
					<input className="button" type="submit" value="SIGN UP" />
					<Link style={{ marginBottom: "4%" }} to="/" className="link">
						Already have an account?
					</Link>
				</form>
			</div>
			<footer className="footer">
				<a href="https://github.com/canrollas/balik-mezati" className="a">
					<FaGithub size={25} />
				</a>
				<p
					style={{
						fontSize: 13,
						marginLeft: 14,
						fontWeight: 500,
						color: "black",
					}}
				>
					~ CENG316 Group 01
				</p>
			</footer>
			<PopUp trigger={trigger} message={errorMessage}></PopUp>
		</div>
	);
}

export default Register;
