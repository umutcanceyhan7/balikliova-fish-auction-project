import React from "react";
import { useNavigate } from "react-router-dom";
import { GrRefresh } from "react-icons/gr";
import { useState } from "react";
import "../styling/CHead.css";
import "../styling/All.css";
import LeftMenu from "../components/CHeadLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function CreateCode() {
	const navigate = useNavigate();

	const [code, setCode] = useState("Press refresh");

	function handleRefresh() {
		var newCode = "";
		// var possible =
		// 	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		// for (var i = 0; i < 6; i++)
		// 	newCode += possible.charAt(
		// 		Math.floor(Math.random() * possible.length)
		// 	);
		// setCode(newCode.toUpperCase());

		fetch(`http://190.92.179.153:8080/api/cooperativeHead/getCode`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setCode(json.memberCode);
				console.log(json.memberCode);
			});
		return newCode;
	}
	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>
			<div className="mid-part">
				<div
					className="code-generator"
					style={{
						width: "40%",
						height: "50%",

						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<p style={{ fontSize: 25, marginBottom: "3%" }}>CODE:</p>
					<p style={{ fontSize: 35, marginBottom: "3%", color: "brown " }}>
						{code}
					</p>

					<GrRefresh
						onClick={handleRefresh}
						style={{
							cursor: "pointer",
							color: "#256A98",
						}}
						size={30}
					></GrRefresh>
				</div>
			</div>
		</div>
	);
}

export default CreateCode;
