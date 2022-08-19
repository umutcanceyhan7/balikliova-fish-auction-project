import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
	FaGithub,
	FaPhoneAlt,
	FaHome,
	FaTwitter,
	FaSistrix,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function ResetPassword() {
	const navigate = useNavigate();

	const usn = "mert"; //old username
	const psw = "123"; // old password

	const handleSubmit = (event) => {
		// Prevent page reload
		event.preventDefault();

		var { uname, pass } = document.forms[0];

		if (uname.value !== usn || pass.value !== psw) {
			setTimeout(() => {}, 2000);
			return false;
		} else {
			console.log("Giriş başarılı");
			navigate("/Register");
			return true;
		}
	};

	const width = window.innerWidth;
	const height = window.innerHeight;

	// useEffect(() => {
	// 	console.log("username: " + username, "password: " + password);
	// }, [username, password]);
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
				className="box"
				style={{
					width: width / 2.2,
					height: height / 1.4,
					backgroundColor: "white" /*DBE1E5*/,
				}}
			>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="textInput"
						placeholder="New Password"
						type="text"
						name="pass"
						required
					/>
					<input
						className="textInput"
						placeholder="Confirm Password"
						type="password"
						required
						style={{ marginBottom: "5%" }}
					/>
					<input className="button" type="submit" value="SAVE" />
					<Link to={"/Register"} className="link">
						Back
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
		</div>
	);
}

export default ResetPassword;
