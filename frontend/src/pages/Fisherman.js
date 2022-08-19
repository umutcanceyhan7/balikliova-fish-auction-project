import React from "react";
import "../styling/CMember.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const width = window.innerWidth;
const height = window.innerHeight;

function Fisherman() {
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
						<div className="list-item">
							Auction Name: {auctionsData[i].name}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Auction date: &nbsp;
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
			<div className="left-menu">
				<a className="menu-btn" style={{ color: "white" }}
                onClick={()=>{
                    var splitterArray = window.location.href.split("/");
		            var username = splitterArray[splitterArray.length-1];
					navigate("/Fisherman/landing/"+username);
                }}
                >
					<p>Homepage</p>
				</a>
                <a className="menu-btn" style={{ color: "white" }}
                onClick={()=>{
                    var splitterArray = window.location.href.split("/");
		            var username = splitterArray[splitterArray.length-1];
					navigate("/Fisherman/auctions/"+username);
                }}
                >
					<p>Auctions</p>
				</a>
				<a
					className="menu-btn"
					onClick={() => {
						console.log("Button clicked");
					}}
				>
					<p style={{color:"black"}} >Sale History:Out of the use case</p>
				</a>
				<a
					onClick={() => {
						console.log("BUTTON CLICKED");
					}}
					className="menu-btn"
				>
					<p style={{color:"black"}}>Payment Info: Out of the use case</p>
				</a>
				<a
					style={{
						position: "absolute",
						bottom: "2%",
						color: "#d3dce0",
						width: "90%",
						textAlign: "center",
						height: "5%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center ",
					}}
					onClick={() => {
						navigate("/");
					}}
				>
					<p>Log out</p>
				</a>
			</div>
			<div className="mid-part">
				<div className="box1">
                    {renderState}
                </div>
			</div>
		</div>
	);
}

export default Fisherman;
