import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styling/CHead.css";

import PopUp from "../popups/PopUp";
import LeftMenu from "../components/CHeadLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function ScheduleAuction() {
	const navigate = useNavigate();

	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");

	function handleSubmit(event) {
		event.preventDefault();

		var { name, quota, timer } = document.forms[0];
		if(! timer.value){
			setTrigger(true);
			setErrorMessage("Bos tarih girilemez!");
			setTimeout(() => {
				setTrigger(false);
			}, 2000);	
		}
		else{
			if(! quota.value){
				setTrigger(true);
				setErrorMessage("Bos kota girilemez!");
				setTimeout(() => {
					setTrigger(false);
				}, 2000);	
			}else{
				if(! name.value){
					setTrigger(true);
					setErrorMessage("Bos isim girilemez!");
					setTimeout(() => {
						setTrigger(false);
					}, 2000);	
				}
				else{
					var nowDate = new Date().getTime() / 1000;
					console.log("Now date:",nowDate);
					var dt = Date.parse(timer.value)/1000;
					console.log("Form date:",dt);
					if (nowDate > dt){
						setTrigger(true);
						setErrorMessage("Tarih ileri zamanlı olmalıdır!");
						setTimeout(() => {
							setTrigger(false);
						}, 2000);
						
					}else {
							
						console.log("form date buyuk cıktı:");
						// Burada artık verilerin servera gönderilmesi saglanıyor!!!.
						fetch(`http://190.92.179.153:8080/api/auction/add`, {
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
							method: "POST",
							body: JSON.stringify({
								name: name.value,
								date: dt,
								quota: quota.value,
							}),
						})
						.then((res) => {
							console.log("HATA DEBUGGER");
							if (res.status == 200) {
								console.log("başarılı");
								setTrigger(true);
								setErrorMessage("Auction saved to SYSTEM.");
								setTimeout(() => {
									setTrigger(false);
								}, 2000);
							}else{
								setTrigger(true);
								setErrorMessage("Auction did notsaved to SYSTEM.");
								setTimeout(() => {
									setTrigger(false);
								}, 2000);
							}
							res.json();
						});
						return 1;
					}


				}
			}
			
			

		}
		
	}
	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>
			<div className="mid-part" style={{ alignItems: "center" }}>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="textInput"
						placeholder="Name"
						type="text"
						name="name"
					/>
  					<input className="textInput" type="datetime-local" id="birthdaytime" name="timer" placeholder="Time"/>

					<input
						className="textInput"
						placeholder="Quota"
						type="number"
						name="quota"
						style={{ marginBottom: "5%" }}
					/>
					<input className="button" type="submit" value="SAVE" />
				</form>
			</div>
			<PopUp message={errorMessage} trigger={trigger}></PopUp>
		</div>
	);
}

export default ScheduleAuction;
