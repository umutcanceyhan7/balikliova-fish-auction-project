import React from "react";
import "../styling/RegisterFisherman.css";
import { useNavigate, Link } from "react-router-dom";
import PopUp from "../popups/PopUp";
import { useState } from "react";
import LeftMenu from "../components/CMemberLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function RegisterFisherman() {
	const navigate = useNavigate();

	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	function handleSubmit(event) {
		event.preventDefault();
		var { username, iban, email, password } = document.forms[0];
		if (username.value.length < 3) {
			setErrorMessage("Username can not be less than three characters");
			setTrigger(true);
			setTimeout(() => {
				setTrigger(false);
			}, 2000);
			return false;
		} else if (iban.value.length != 24) {
			setErrorMessage("Iban should consist of 24 digits.");
			setTrigger(true);
			setTimeout(() => {
				setTrigger(false);
			}, 2000);
			return false;
		} else if (/^[a-zA-Z]+$/.test(iban.value)) {
			setErrorMessage("Iban should not contain characters");
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
			fetch(`http://190.92.179.153:8080/api/register-fisherman`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					username: username.value,
					password: password.value,
					mail: email.value,
					iban: iban.value,
				}),
			}).then((res) => {
				if (res.status == 200) {
					setTrigger(true);
					setErrorMessage("Sign Up successful");
					setTimeout(() => {
						setTrigger(false);
					}, 2000);
				}
				res.json();
			});
		}
	}

	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>			
			<div className="mid-part">
				<form className="form" onSubmit={handleSubmit}>
					<input
						className="textInput1"
						placeholder="Mail"
						type="text"
						name="email"
						required
					/>
					<input
						className="textInput1"
						placeholder="Username"
						type="text"
						name="username"
						required
					/>

					<input
						className="textInput1"
						placeholder="Password"
						type="password"
						name="password"
						required
					/>

					<input
						className="textInput1"
						placeholder="Iban"
						type="text"
						name="iban"
						required
						style={{ marginBottom: "4%" }}
					/>
					<input className="button1" type="submit" value="REGISTER" />
				</form>
			</div>
			<PopUp trigger={trigger} message={errorMessage}></PopUp>
		</div>
	);
}

export default RegisterFisherman;
