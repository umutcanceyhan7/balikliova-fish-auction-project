import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styling/LeftMenu.css";

function FishermanLeftMenu() {
const navigate = useNavigate();

    return <>
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
            </>
}

export default FishermanLeftMenu;