import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RegisterFish from "./pages/RegisterFish";
import AuctionCustomer from "./pages/AuctionCustomer";
import CHeadLanding from "./pages/CHeadLanding";
import RegisterFisherman from "./pages/RegisterFisherman";
import Customer from "./pages/Customer";
import CustomerLanding from "./pages/CustomerLanding";
import Fisherman from "./pages/Fisherman";
import CHead from "./pages/CHead";
import AuctionCHead from "./pages/AuctionCHead";
import SaleHistory from "./pages/SaleHistory";
import {
	FaGithub,
	FaPhoneAlt,
	FaHome,
	FaTwitter,
	FaSistrix,
} from "react-icons/fa";
import "./styling/App.css";
import PopUp from "./popups/PopUp.js";
import { useNavigate } from "react-router-dom";
import CreateCode from "./pages/CreateCode";
import FadeLoader from "react-spinners/FadeLoader";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import auth from "./Authentication/Auth";
import ScheduleAuction from "./pages/ScheduleAuction";
import "./popups/PopUp.css";
import FishermanLanding  from "./pages/FishermanLanding";
import CMemberLandingPage from "./pages/CMemberLanding";
import 'bootstrap/dist/css/bootstrap.min.css';

function Root() {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	const handleSubmit = (event) => {
		// Prevent page reload
		event.preventDefault();
		var { uname, pass } = document.forms[0];
		setLoading(true);
		if (uname.value.length < 3) {
			setTrigger(true);
			setErrorMessage("Username can not be less than three characters.");
			setTimeout(() => {
				setLoading(false);
				setTrigger(false);
			}, 2000);
			return false;
		}
		fetch(
			`http://190.92.179.153:8080/api/loginget/${uname.value}/${pass.value}`
		)
			.then((res) => res.json())
			.then((json) => {
				console.log(uname.value);
				console.log(pass.value);
				console.log(json);

				if (json.status == 200) {
					if (json.userType == "CooperativeHead") {
						setTimeout(() => {
							console.log("Cooperative head logged in");
							auth.login();
							navigate("/CHead/landing/"+uname.value);
							return true;
						}, 2000);
					} else if (json.userType == "Customer") {
						setTimeout(() => {
							console.log("Customer logged in");
							auth.login();
							console.log("Local Storage printing:",localStorage.getItem("user"));
							navigate("/Customer/landing/"+uname.value);
							return true;
						}, 2000);
					} else if (json.userType == "fisherman") {
						setTimeout(() => {
							console.log("Fisherman logged in");
							auth.login();
							navigate("/Fisherman/landing/"+uname.value);
							return true;
						}, 2000);
					} else if (json.userType == "cooperativeMember") {
						setTimeout(() => {
							console.log("Cooperative member logged in");
							auth.login();
							navigate("/CMember/landing/"+uname.value);
							return true;
						}, 2000);

					}
					
				} else {
					setTrigger(true);
					if (json.message == "Username does not exists!") {
						setErrorMessage("Username does not exists!");
					} else {
						setErrorMessage("Username or password is incorrect");
					}
					setTimeout(() => {
						setTrigger(false);
						setLoading(false);
					}, 2000);
				}
			});
	};

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
			<FadeLoader
				css={{ position: "fixed", top: "50%", left: "50%", zIndex: 1 }}
				color="purple"
				loading={loading}
				size={40}
			/>
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
					backgroundColor: "white" /*DBE1E5*/,
				}}
			>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="textInput"
						placeholder="Username"
						type="text"
						name="uname"
						required
					/>
					<input
						className="textInput"
						placeholder="Password"
						type="password"
						name="pass"
						required
						style={{ marginBottom: "5%" }}
					/>
					<input className="button" type="submit" value="LOGIN" />
					<a
						onClick={() => {
							navigate("/ResetPassword");
						}}
						className="link"
					>
						Forgot Password
					</a>
					<span style={{ fontSize: 12 }}>or</span>
					<Link to={"/Register"} className="link">
						Sign Up
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

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Root />}></Route>
				<Route path="/Register" element={<Register />}></Route>
				<Route path="/ResetPassword" element={<ResetPassword />}></Route>
				<Route
					path="/CMember/landing/:username"
					element={
						<ProtectedRoute>
							<CMemberLandingPage />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="Cmember/RegisterFisherman/:username"
					element={<RegisterFisherman />}
				></Route>

				<Route
					path="/Customer/Auction/:id/:pathuser" 
					element={<AuctionCustomer />}
				></Route>

				{/* <Route path="/CHead" element={<CHead />}></Route> */}

				<Route
					path="/CHead/CreateCode/:username"
					element={
						<ProtectedRoute>
							<CreateCode />
						</ProtectedRoute>
					}
				></Route>

				<Route
					path="/CHead/auction/:id/:username"
					element={
						<ProtectedRoute>
							<AuctionCHead />
						</ProtectedRoute>
					}
				></Route>
				
				<Route
					path="/Cmember/RegisterFish/:username"
					element={
						<ProtectedRoute>
							<RegisterFish />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/Customer/landing/:username"
					element={
						<ProtectedRoute>
							<CustomerLanding />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/Customer/auctions/:username"
					element={
						<ProtectedRoute>
							<Customer />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/Fisherman/landing/:username"
					element={
						<ProtectedRoute>
							<FishermanLanding />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/Fisherman/auctions/:username"
					element={
						<ProtectedRoute>
							<Fisherman />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/CHead/landing/:username"
					element={
						<ProtectedRoute>
							<CHeadLanding />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/CHead/auctionsView/:username"
					element={
						<ProtectedRoute>
							<CHead />
						</ProtectedRoute>
					}
				></Route>
								<Route
					path="/Customer/salehistory/:username"
					element={
						<ProtectedRoute>
							<SaleHistory />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/CHead/ScheduleAuction/:username"
					element={<ScheduleAuction />}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
