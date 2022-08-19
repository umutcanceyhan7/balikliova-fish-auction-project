import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Authentication/Auth";
import "../styling/LeftMenu.css";

function CHeadLeftMenu() {
const navigate = useNavigate();

    return <>
<div className="left-menu">
				{/* Homepage */}
				<a className="menu-btn" onClick={() => {
					var splitterArray = window.location.href.split("/");
					var username = splitterArray[splitterArray.length - 1];
					navigate("/CHead/landing/" + username);
				}}>
					<p>Homepage</p>
				</a>
				{/* Create Code */}
				<a
					className="menu-btn"
					onClick={() => {
						var splitterArray = window.location.href.split("/");
						var username = splitterArray[splitterArray.length - 1];
						navigate("/CHead/CreateCode/" + username);
					}}
				>
					<p>Create Code</p>
				</a>
				{/* Auctions View */}
				<a
					className="menu-btn"
					onClick={() => {
						var splitterArray = window.location.href.split("/");
						var username = splitterArray[splitterArray.length - 1];
						navigate("/CHead/auctionsView/" + username);
					}}
				>
					<p>Auctions View</p>
				</a>
				{/* Schedule Auction */}
				<a
					className="menu-btn"
					onClick={() => {
						var splitterArray = window.location.href.split("/");
						var username = splitterArray[splitterArray.length - 1];
						navigate("/CHead/ScheduleAuction/" + username);
					}}
				>
					<p>Schedule Auction</p>
				</a>
				{/* Logout */}
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
						auth.logout();
						navigate("/");
					}}
				>
					<p>Log out</p>
				</a>
			</div>
            </>
}

export default CHeadLeftMenu;