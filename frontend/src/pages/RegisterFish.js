import React, { useEffect } from "react";
import "../styling/RegisterFisherman.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import PopUp from "../popups/PopUp";
import LeftMenu from "../components/CMemberLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function RegisterFish() {
	const navigate = useNavigate();

	const [trigger, setTrigger] = useState(false);
    const [renderState, setRenderState] = useState([]);
    const [renderState2, setRenderState2] = useState([]);
	const person = { name: "Rue", age: 17 }; //create an object


	const [errorMessage, setErrorMessage] = useState("Default error message");
    
    var userNameArray = [];
    var idArray=[];
    var idNameArray = []
    var emptyArray = [];
    var emptyInner = [];
    
    useEffect(() => {
        fetch('http://190.92.179.153:8080/api/fisherman',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET"
            
            
        }).then(response => response.json()).then((json) => {
            for(var i=0;i<json.length;i++){
                userNameArray.push(json[i]['username'])
            }
            emptyArray = printUserNameHTML(userNameArray);
            return emptyArray;

        }).then((emptyArray) => {
            setRenderState(emptyArray);
        });
        fetch('http://190.92.179.153:8080/api/auction/fetchAuctions',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET"
            
            
        }).then(response => response.json()).then((json) => {
            for(var i=0;i<json.length;i++){
                idNameArray.push(json[i]['name'] + " ID:"+json[i]['id']);
                idArray.push(json[i]['id']);
            }
            emptyInner = printAuctionIDHTML();
            return emptyInner;

        }).then((emptyInner) => {
            setRenderState2(emptyInner);
        });
    }, []);
    function printAuctionIDHTML(){
        for(var i=0;i<idArray.length;i++){
            emptyInner.push(<option value={idArray[i]}>{idNameArray[i]}</option>);

        }
        return emptyInner;
    }
    function printUserNameHTML(){
        
        for(var i=0;i<userNameArray.length;i++){
           
            emptyArray.push(<option value={userNameArray[i]}>{userNameArray[i]}</option>);

        }
        return emptyArray;
        
    }

	function handleSubmit(event) {
		event.preventDefault();
		var { type, weight, price,fishermanid,auctionid } = document.forms[0];
		console.log(fishermanid.value);
		var jsonVar = JSON.stringify({
			type: type.value,
			status: "Unsold",
			weight: weight.value,
			price:price.value,
			fishermanId:fishermanid.value,
			auctionId:auctionid.value
		});
		console.log(jsonVar);
		
		fetch(`http://190.92.179.153:8080/api/cooperativeMember/add-fish`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: jsonVar,
				
			}).then((res) => {
				if (res.status == 200) {
					setTrigger(true);
					setErrorMessage("Register fish success!");
					setTimeout(() => {
						setTrigger(false);
					}, 2000);
					console.log("Gonderildi");
				}else{
					console.log(res.json());
					setTrigger(true);
					setErrorMessage("Register fish not succes check fields!");
					setTimeout(() => {
						setTrigger(false);
					}, 2000);
				}
				res.json();
			});
	}
	
	

	return (
		<div className="root1" style={{ width: width, height: height }}>
			<div className="header1">Online Fish Auction System</div>
			<LeftMenu/>
            <div className="mid-part">
            <form className="form" onSubmit={handleSubmit}>
					<input
						className="textInput1"
						placeholder="Balık Cinsi"
						type="text"
						name="type"
						required
					/>
					<input
						className="textInput1"
						placeholder="kilogram"
						type="number"
						name="weight"
						required
					/>

					<select
						className="textInput1"
						name="fishermanid"
						required
					>{renderState}</select>

                    <select
						className="textInput1"
						name="auctionid"
						required
					>{renderState2}</select>
                    <input
						className="textInput1"
						placeholder="Kilogram Fiyat"
						type="text"
						name="price"
						required
						style={{ marginBottom: "4%" }}
					/>
					<input className="button1" type="submit" value="REGISTER" />
				</form>
				<PopUp trigger={trigger} message={errorMessage}></PopUp>

            </div>
		
		</div>
    )
}

export default RegisterFish;
