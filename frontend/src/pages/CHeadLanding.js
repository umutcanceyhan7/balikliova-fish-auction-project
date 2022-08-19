import React from "react";
import "../styling/CMember.css";
import "../styling/All.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftMenu from "../components/CHeadLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function CHeadLanding() {
	const navigate = useNavigate();

	function navigateToAuctions() {
		var splitterArray = window.location.href.split("/");
		var username = splitterArray[splitterArray.length - 1];
		navigate("/CHead/landing/" + username);
	}

	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>
			<div className="mid-part">
				<div className="box1 text-center">
					<h1 className="league-spartan">Welcome to the landing page!</h1>
					<h2 className="league-spartan">You can find whatever what you want!</h2>
				</div>
			</div>
		</div>
	);
}

export default CHeadLanding;
