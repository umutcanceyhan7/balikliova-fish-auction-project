import React from "react";
import "../styling/Auction.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const width = window.innerWidth;
const height = window.innerHeight;

function AuctionCHead() {
	const navigate = useNavigate();
    
	const [trigger, setTrigger] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Default error message");
    var splitterArray = window.location.href.split("/");
    var username = splitterArray[splitterArray.length-1];
    const renderViews = [];
	const [renderStateView, setRenderStateView] = useState([]);
    const [fishType, setFishType] = useState('');
    const [fishKg, setFishKg] = useState(0);
    const [buyer, setBuyer] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [bidPrice, setBidPrice] = useState(0);
    const [fisherman, setFisherman] = useState('');

    const handleStartSale = () => {
        callNextSale();
    }

    const handleCloseSale = () => {
        callCloseSale();
    }

    const callCloseSale = () => {
        return fetch('http://190.92.179.153:8080/api/auction/close/sale',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT"
        });
    } 
    const callNextSale = () => {
        return fetch('http://190.92.179.153:8080/api/auction/next/sale',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT"
        })
        .then(response => response.json())
        .then((json) => {
            setFishType(json.fish.type);
            setFishKg(json.fish.weight);
            if(json.buyer){
            setBuyer(json.buyer);
            }
            if(json.fish.price){
                setMinPrice(json.fish.price);
            }
            if(json.price){
                setBidPrice(json.price);
            }
            if(json.fish.fishermanId){
                setFisherman(json.fish.fishermanId);
            }

        }).catch(error => {
            console.log("Auction CHead Error" + error.message);
            setTrigger(true);
            setErrorMessage("There is no next sale! You can finish the auction!");
            setTimeout(() => {
                setTrigger(false);
            }, 2000);
          })
        
    };

    const view6 = () => {
        setTimeout(() => {
            navigate('/CHead/landing/'+ username);
        }, 5000);
        return <>
                <h1 className="text-center">Sale is finished thank you for joining</h1>
            </>
    }

    const view4 = (nextSale) => {
        return <>
         <div className="container d-flex flex-column align-items-center justify-content-center text-center">
                <h1 className="league-spartan auction-list-heading">LIVE Auction</h1>
                <iframe width="420" height="345" src="https://www.youtube.com/embed/86YLFOog4GM"></iframe>
                 {/* Fish Type */}
                 <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fish Type:</span>
                            <span className="ps-1 montserrat auction-list-item">{nextSale.fish.type ? nextSale.fish.type : 'Undefined fish type'}</span>
                        </span>
                    </div>
                {/* Fish Weight */}
                <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fish Weight:</span>
                            <span className="ps-1 montserrat auction-list-item">{nextSale.fish.weight ? nextSale.fish.weight : 'Undefined fish type'}</span>
                        </span>
                    </div>
                <div><button className="btn btn-secondary mt-3" onClick={() => {handleStartSale()}} >Start Sale</button></div>
            </div>
                </>
        
    }

    const view1 = (currentSale) => {
        return <>
                <div className="container d-flex flex-column align-items-center justify-content-center text-center">
                <h1 className="league-spartan auction-list-heading">LIVE Auction</h1>
                <iframe width="420" height="345" src="https://www.youtube.com/embed/86YLFOog4GM"></iframe>
                <div className="col-12">
                    {/* Buyer */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Buyer:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.buyer ? currentSale.buyer : 'No buyer'}</span>
                        </span>
                    </div>
                    {/* Price */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Base Price:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.fish.price ? currentSale.fish.price : 'No base price'}</span>
                        </span>
                    </div>
                    {/* Fish Type */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fish Type:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.fish.type ? currentSale.fish.type : 'Undefined fish type'}</span>
                        </span>
                    </div>
                    {/* Fisherman */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fisherman:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.fish.fishermanId ? currentSale.fish.fishermanId : 'Undefined fisherman'}</span>
                        </span>
                    </div>

                    {/* Fish Weight */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fish Weight:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.fish.weight ? currentSale.fish.weight : 'Undefined fish type'}</span>
                        </span>
                    </div>

                    {/* Heighest Bid */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Highest Bid:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.price ? currentSale.price : 'No bid'}</span>
                        </span>
                    </div>

                    {/* Fisherman */}
                    <div className="auction-list-container">
                        <span className="me-2">
                            <span className="league-spartan auction-list-heading">Fisherman:</span>
                            <span className="ps-1 montserrat auction-list-item">{currentSale.fish.fishermanId ? currentSale.fish.fishermanId : 'Undefined fisherman'}</span>
                        </span>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-secondary mt-3" onClick={() => {handleCloseSale()}} >Close Sale</button>
                </div>
            </div>
                
            </>
    }

    useEffect(() => {
        const interval = setInterval(() => {
          getStatusOfSale();
          }, 1000);
          return () => {clearInterval(interval);};
    }, []);

    function getStatusOfSale(){
        fetch('http://190.92.179.153:8080/api/auction/get/current/status',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET"

        }).then(response => response.json()).then((json) => {
            // Close Sale
            // Fish info -> Current sale
            if(json["pageCodeCH"] == 1){
                setRenderStateView(view1(json.currentSale));
            }
            // Start Sale
            else if(json["pageCodeCH"] == 4){
                setRenderStateView(view4(json.nextSale));

            }

            // Finish Sale
            else if(json["pageCodeCH"] == 6){
                setRenderStateView(view6());
            }
        }
        );
    }

	return (
        <>
		<div className="container d-flex flex-column align-items-center justify-content-center h-100 vh-100">
            <div className="box1 m-0">{renderStateView}</div>
        </div>
    </>
	);
}

export default AuctionCHead;