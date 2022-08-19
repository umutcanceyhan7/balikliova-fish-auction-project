import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styling/LeftMenu.css";

function CMemberLeftMenu() {
const navigate = useNavigate();

    return <>
<div className="left-menu">
				<a className="menu-btn" style={{ color: "white" }} onClick={() => {
                        var splitterArray = window.location.href.split("/");
                        var username = splitterArray[splitterArray.length-1];
                        navigate("/Cmember/landing/"+username);
					}} >
					<p>Homepage</p>
				</a>
				<a className="menu-btn" onClick={() => {
						var splitterArray = window.location.href.split("/");
                        var username = splitterArray[splitterArray.length-1];
                        navigate("/Cmember/registerFish/"+username);
					}}>
					<p>Register Fish</p>
				</a>
				<a
					onClick={() => {
						var splitterArray = window.location.href.split("/");
                        var username = splitterArray[splitterArray.length-1];
                        navigate("/Cmember/registerFisherman/"+username);
					}}
					className="menu-btn"
				>
					<p>Register Fisherman</p>
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
            
            </>
}

export default CMemberLeftMenu;