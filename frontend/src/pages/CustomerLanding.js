import React from "react";
import "../styling/CMember.css";
import "../styling/All.css";
import LeftMenu from "../components/CustomerLeftMenu";


const width = window.innerWidth;
const height = window.innerHeight;

function CustomerLanding() {
	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>
			<div className="mid-part">
				<div className="box1 text-center">
                    <h1 className="league-spartan">Welcome to fish auction customer interface!</h1>
                    <h2 className="league-spartan">You can find the necesarry tools in the left dashboard</h2>
                    <h2 className="league-spartan">Greetings!</h2>
                </div>
			</div>
		</div>
	);
}

export default CustomerLanding;