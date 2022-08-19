import React from "react";
import "../styling/CMember.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftMenu from "../components/CMemberLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function CMember() {
	const navigate = useNavigate();
	const [renderState, setRenderState] = useState([]);
	const renderAuctions = [];
	useEffect(() => {
		fetch(`http://190.92.179.153:8080/api/auction/fetchAuctions`)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
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
						<div className="list-item d-flex justify-content-center">
							<div className="col-12">
								<span className="me-2"><span className="league-spartan auction-list-heading">Name:</span>  <span className="ps-1 montserrat auction-list-item">{auctionsData[i].name}</span> </span>
								<span className="me-2"><span className="league-spartan auction-list-heading">Date:</span>  <span className="ps-1 montserrat auction-list-item">{date.toLocaleDateString("en-US")}</span> </span>
								<span className="me-2"><span className="league-spartan auction-list-heading">Time:</span>  <span className="ps-1 montserrat auction-list-item">{hour}:{minute}</span> </span>
							</div>	
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
				<div className="box1">{renderState}</div>
			</div>
		</div>
	);
}

export default CMember;
