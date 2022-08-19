import React from "react";
import "../styling/CMember.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PopUp from "../popups/PopUp";
import "../popups/PopUp.css";
import LeftMenu from "../components/CustomerLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function Customer() {
	const navigate = useNavigate();
	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	const [renderState, setRenderState] = useState([]);
	const renderAuctions = [];
	function redirectToHomePage(){
		var splitterArray = window.location.href.split("/");
		var username = splitterArray[splitterArray.length-1];
		navigate("/Customer/landing/"+username);

	};
	function joinToTheAuction(auctionId,date){
		var splitterArray = window.location.href.split("/");
		var username = splitterArray[splitterArray.length-1];
		var fetchString  = 'http://190.92.179.153:8080/api/auction/join/'+auctionId+"/"+username;
		fetch(fetchString,{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "PUT"
				
				
			}).then((res) => {
				if (res.status == 200) {
					console.log("200");
					var auctionpath = "/Customer/Auction/"+auctionId+"/"+username;
					navigate(auctionpath);
					
					res.json();
				}else if(res.status != 200){
					let currentDate = Date.now();
					let auctionDate = Number(new Date(date));
					// If date is passed or undefined it means it is finished or full
					if(date == undefined || auctionDate < currentDate){
						setTrigger(true);
						setErrorMessage("You can not join Auction. The Auction has finished or full!");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);	
					}
					// If date is not passed it means it has not started yet!
					else if (auctionDate > currentDate){
						setTrigger(true);
						setErrorMessage("You can not join Auction. The Auction has not started yet!");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);	
					}
					else{
						setTrigger(true);
						setErrorMessage("Something goes wrong");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);	
					}
					
				}
				
			});
			
	}
	useEffect(() => {
		fetch(`http://190.92.179.153:8080/api/auction/fetchAuctions`)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				return json;
			})
			.then((auctionsData) => {
				for (var i = 0; i < auctionsData.length; i++) {
					const date = new Date(auctionsData[i].date * 1000);
					const hour =
						date.getHours().toString().length == 1
							? "0" + date.getHours().toString()
							: date.getHours().toString();
					const minute =
						date.getMinutes().toString().length == 1
							? "0" + date.getMinutes().toString()
							: date.getMinutes().toString();
					if(auctionsData[i]['is_finished']==1){
						var isAuctionFinished = true;
					}else{
						var isAuctionFinished = false;
					}
					if(isAuctionFinished){
						let auctionId = auctionsData[i].id;
						renderAuctions.push(
							<div className="list-item d-flex justify-content-evenly p-2">
							<div className="col-8 text-center">
								<div>
									<span className="me-2"><span className="league-spartan auction-list-heading">Name:</span>  <span className="ps-1 montserrat auction-list-item">{auctionsData[i].name}</span> </span>
									<span className="me-2"><span className="league-spartan auction-list-heading">Date:</span>  <span className="ps-1 montserrat auction-list-item">{date.toLocaleDateString("en-US")}</span> </span>
								</div>
								<div className="text-center">
									<span className="me-2"><span className="league-spartan auction-list-heading">Time:</span>  <span className="ps-1 montserrat auction-list-item">{hour}:{minute}</span> </span>
									<span className="me-2"><span className="league-spartan auction-list-heading">Status:</span>  <span className="ps-1 montserrat auction-list-item grey">Ended</span> </span>
								</div>
							</div>
						{/* Starts auction or pops out error */}
						<div className="offset-1 col-2"><button className={auctionsData[i].is_finished ? "btn btn-secondary league-spartan disabled" : "btn btn-secondary league-spartan"} onClick={() => {joinToTheAuction(auctionId, date)}}>Join to Auction</button></div>
						<div className="offset-1"></div>
						</div>
						);
					}
					else{
						let auctionId = auctionsData[i].id;
						renderAuctions.push(
							<div className="list-item d-flex justify-content-evenly p-2">
							<div className="col-8 text-center">
								<div>
									<span className="me-2"><span className="league-spartan auction-list-heading">Name:</span>  <span className="ps-1 montserrat auction-list-item">{auctionsData[i].name}</span> </span>
									<span className="me-2"><span className="league-spartan auction-list-heading">Date:</span>  <span className="ps-1 montserrat auction-list-item">{date.toLocaleDateString("en-US")}</span> </span>
								</div>
								<div className=" text-center">
									<span className="me-2"><span className="league-spartan auction-list-heading">Time:</span>  <span className="ps-1 montserrat auction-list-item">{hour}:{minute}</span> </span>
									<span className="me-2"><span className="league-spartan auction-list-heading">Status:</span>  <span className="ps-1 montserrat auction-list-item green">Not Ended</span> </span>
								</div>
							</div>
						{/* Starts auction or pops out error */}
						<div className="offset-1 col-2"><button className="btn btn-secondary league-spartan" onClick={() => {joinToTheAuction(auctionId, date)}}>Join to Auction</button></div>
						<div className="offset-1"></div>
						</div>
						);
					}

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

export default Customer;