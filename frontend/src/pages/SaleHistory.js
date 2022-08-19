import React from "react";
import "../styling/CMember.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomerLeftMenu from "../components/CustomerLeftMenu";

const width = window.innerWidth;
const height = window.innerHeight;

function SaleHistory() {
	const navigate = useNavigate();
	const [renderState, setRenderState] = useState([]);
	const renderAuctions = [];

	useEffect(() => {
        var splitterArray = window.location.href.split("/");
        var username = splitterArray[splitterArray.length-1];
		fetch(`http://190.92.179.153:8080/api/get/sales/`+username)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.then((auctionsData) => {
				for (var i = 0; i < auctionsData.length; i++) {
                    console.log(auctionsData[i]);
					// const unixTime = auctionsData[i].date;
					// const date = new Date(unixTime * 1000);
                    renderAuctions.push(
                        <div className="list-item">
							Auction Id: {auctionsData[i].sale.id}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fish: {auctionsData[i].fish.type}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price:{auctionsData[i].sale.price}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Weight :{auctionsData[i].fish.weight}
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

            <CustomerLeftMenu></CustomerLeftMenu>
			<div className="mid-part">
				<div className="box1">{renderState}</div>
                
			</div>
		</div>
	);
}

export default SaleHistory;