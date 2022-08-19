import React from "react";
import "../styling/CHead.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PopUp from "../popups/PopUp";
import LeftMenu from "../components/CHeadLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function CHead() {
	const navigate = useNavigate();

	const [renderState, setRenderState] = useState([]);
	const renderAuctions = [];
	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	const startAuction = (auctionId) => {
		var splitterArray = window.location.href.split("/");
		var username = splitterArray[splitterArray.length-1];
		fetch(`http://190.92.179.153:8080/api/auction/start/`+auctionId,
		{headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "PUT",})
			.then((res) => {
				if(res.status == 400){
					console.log("400");
					setTrigger(true);
					setErrorMessage("Auction has started or finished!");
					setTimeout(() => {
						setTrigger(false);
					}, 2000);

				}
				else if(res.status == 200){
					console.log("200");
					navigate('/CHead/auction/'+auctionId+'/'+username);
					res.json();
				}
				})
	};
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
					const id = auctionsData[i].id;
					renderAuctions.push(
						<div className="list-item d-flex justify-content-around">
							<div className="col-8">
							<span className="me-2"><span className="league-spartan auction-list-heading">Auction Name:</span>  <span className="ps-1 montserrat auction-list-item">{auctionsData[i].name}</span> </span>
							<span className="me-2"><span className="league-spartan auction-list-heading">Auction Date:</span>  <span className="ps-1 montserrat auction-list-item">{date.toLocaleDateString("en-US")}</span> </span>
							<span className="me-2"><span className="league-spartan auction-list-heading">Auction Time:</span>  <span className="ps-1 montserrat auction-list-item">{hour}:{minute}</span> </span>
							</div>
						{/* Starts auction or pops out error */}
						<div className="col-2"><button className={auctionsData[i].is_finished ? "btn btn-secondary montserrat disabled" : "btn btn-secondary montserrat"} onClick={() => {startAuction(id);}}>Start Auction</button></div>
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
				<PopUp message={errorMessage} trigger={trigger} color={"redBg whiteText"}></PopUp>
			</div>
		</div>
	);
}

export default CHead;
