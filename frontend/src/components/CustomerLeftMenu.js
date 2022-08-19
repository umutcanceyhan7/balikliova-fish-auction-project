import React from "react";
import { useNavigate } from "react-router-dom";
import "../styling/LeftMenu.css";

function CustomerLeftMenu() {
    const navigate = useNavigate();

    function redirectToAuction(){

        var splitterArray = window.location.href.split("/");
        var username = splitterArray[splitterArray.length-1];
        
        navigate("/Customer/auctions/"+username);
    }
    return <>
    <div className="left-menu">
				<a className="menu-btn" onClick={() => {
                     var splitterArray = window.location.href.split("/");
                     var username = splitterArray[splitterArray.length-1];
                     navigate("/Customer/landing/"+username);
                }} style={{ color: "white" }}>
					<p>Homepage</p>
				</a>
				<a
					className="menu-btn"
					onClick={() => {
						redirectToAuction()
					}}>
					<p>Auction</p>
				</a>
				<a
					onClick={() => {
						console.log("BUTTON CLICKED");
					}}
					className="menu-btn"
				>
					<p style={{color:"black"}}>Cart:Out of test case</p>
				</a>
				<a
					
					className="menu-btn"
				>
					<p style={{color:"black"}}><a onClick={()=>{
						var splitterArray = window.location.href.split("/");
						var username = splitterArray[splitterArray.length-1];
						navigate("/Customer/salehistory/"+username);
					}} style={{color:"black"}}>Purchase History:Out of test case</a></p>
				</a>
				<a

					className="menu-btn"
				>
					<p><p style={{color:"black"}}>Payment Info:Out of test case</p></p>
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

export default CustomerLeftMenu;