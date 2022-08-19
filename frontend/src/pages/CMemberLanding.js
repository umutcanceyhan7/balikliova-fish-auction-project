import React from "react";
import "../styling/CMember.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftMenu from "../components/CMemberLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function CmemberLandingPage() {
	const navigate = useNavigate();
	const [renderState, setRenderState] = useState([]);
	const renderAuctions = [];
	useEffect(() => {
		fetch(`http://190.92.179.153:8080/api/auction/fetchAuctions`)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.then((auctionsData) => {
				for (var i = 0; i < auctionsData.length; i++) {
					// const unixTime = auctionsData[i].date;
					// const date = new Date(unixTime * 1000);

					const date = new Date(auctionsData[i].date * 1000);
					const hour =
						date.getHours().toString().length == 1
							? "0" + date.getHours().toString()
							: date.getHours().toString();
					const minute =
						date.getMinutes().toString().length == 1
							? "0" + date.getMinutes().toString()
							: date.getMinutes().toString();

					renderAuctions.push(
						<div className="list-item">
							Auction Name: {auctionsData[i].name}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Auction date:
							{date.toLocaleDateString("en-US")}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Auction Time: {hour}:
							{minute}
						</div>
					);
				}
				return renderAuctions;
			})
			.then((renderAuctions) => {
				setRenderState(renderAuctions);
			});
	}, []);

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

export default CmemberLandingPage;
