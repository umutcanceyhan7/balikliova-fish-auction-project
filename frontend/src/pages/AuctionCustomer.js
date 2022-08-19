import React from "react";
import "../styling/Auction.css";
import "../styling/All.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUp from "../popups/PopUp";

const width = window.innerWidth;
const height = window.innerHeight;

function AuctionCustomer() {
    const navigate = useNavigate();
    const [renderStateView, setRenderStateView] = useState([]);


    const [trigger, setTrigger] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Default error message");

    var splitterArray = window.location.href.split("/");
    var username = splitterArray[splitterArray.length - 1];

    useEffect(() => {
        const interval = setInterval(() => {
            getStatusOfSale();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getStatusOfSale() {
        fetch('http://190.92.179.153:8080/api/auction/get/current/status', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET"

        }).then(response => response.json()).then((json) => {
            // 6 finish
            // 1 give bid page
            // 2 waiting for CHead
            // 3 if the first fish is waited
            if (json["pageCodeCst"] == 6) {
                setRenderStateView(view6);
            }
            else if (json["pageCodeCst"] == 3) {
                setRenderStateView(view3);
            }
            else if (json["pageCodeCst"] == 2) {
                setRenderStateView(view2(json.closedSale));
            }
            else if (json["pageCodeCst"] == 1) {
                setRenderStateView(view1(json.currentSale));
            }

        });
    }
    const handleMakeBid = (event) => {
        event.preventDefault();
        var { price, basePrice } = document.forms[0];
        if (price < basePrice) {
            setTrigger(true);
            setErrorMessage("Bid is less than base price please make higher bid!");
            setTimeout(() => {
                setTrigger(false);
            }, 2000);
        }
        else {
            makeBid(price.value);
        }
    }
    function makeBid(bid) {
        fetch('http://190.92.179.153:8080/api/auction/make/bid/' + username + '/' + bid, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT"
        }).then(response => {
            if (response.status == 200) {
                setTrigger(true);
                setErrorMessage('Bid is made successfully!');
                setTimeout(() => {
                    setTrigger(false);
                }, 2000);
            }
            else if (response.status == 400) {
                setTrigger(true);
                setErrorMessage('Something goes wrong please try again! (400)');
                setTimeout(() => {
                    setTrigger(false);
                }, 2000);
            }
            else if (response.status == 409) {
                setTrigger(true);
                setErrorMessage('Your bid can not be less than highest bid or base price!');
                setTimeout(() => {
                    setTrigger(false);
                }, 2000);
            }
        });
    }


    const view6 = () => {
        setTimeout(() => {
            navigate('/Customer/landing/' + username);
        }, 5000);
        return <>
            <h1 className="montserrat text-center">Auction is finished you will be redirected to homepage in 5 seconds</h1>
        </>
    }
    const view3 = () => {
        return <>
            <div className="montserrat text-center">Waiting for the cooperative head to start first sale!</div>
        </>
    }


    const view2 = (closedSale) => {
        return <>
            <div className="text-center">
                <h2 className="league-spartan">Sale Closed</h2>
                <h2 className="league-spartan">Waiting for the CHead to start next sale</h2>
            </div>
            <div className="text-center">
                <h2 className="league-spartan">Closed Sale Information</h2>
                {/* Buyer */}
                <div className="auction-list-container">
                    <span className="me-2">
                        <span className="league-spartan auction-list-heading">Buyer:</span>
                        <span className="ps-1 montserrat auction-list-item">{closedSale.buyer ? closedSale.buyer : 'No buyer'}</span>
                    </span>
                </div>
                {/* Price */}
                <div className="auction-list-container">
                    <span className="me-2">
                        <span className="league-spartan auction-list-heading">Price:</span>
                        <span className="ps-1 montserrat auction-list-item">{closedSale.price ? closedSale.price : `Base price ${closedSale.fish.price}`}</span>
                    </span>
                </div>
                {/* Fish Type */}
                <div className="auction-list-container">
                    <span className="me-2">
                        <span className="league-spartan auction-list-heading">Fish Type:</span>
                        <span className="ps-1 montserrat auction-list-item">{closedSale.fish.type ? closedSale.fish.type : 'Undefined fish type'}</span>
                    </span>
                </div>
                {/* Fisherman */}
                <div className="auction-list-container">
                    <span className="me-2">
                        <span className="league-spartan auction-list-heading">Fisherman:</span>
                        <span className="ps-1 montserrat auction-list-item">{closedSale.fish.fishermanId ? closedSale.fish.fishermanId : 'Undefined fisherman'}</span>
                    </span>
                </div>
            </div>
        </>
    }

    const view1 = (currentSale) => {
        return <>
            <div className="container d-flex flex-column align-items-center justify-content-center text-center">
                <h1 className="league-spartan auction-list-heading">LIVE Auction</h1>
                <iframe width="420" height="345" src="https://www.youtube.com/embed/86YLFOog4GM"></iframe>
                <div className="d-flex">
                <div className="col-6">
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
                <div className="col-6">
                    <form className="p-3 text-center h-100 d-flex flex-column justify-content-center align-items-center" onSubmit={handleMakeBid}>
                        <input
                            className="auction-customer-input p-3"
                            placeholder="Fiyat ver"
                            type="text"
                            name="price"
                            required
                        />
                        <input className="btn btn-secondary mt-3" type="submit" value="Teklif Ver" />
                        <input type="hidden" name="basePrice" value={currentSale.fish.price} />
                    </form>
                </div>

                </div>
            </div>
        </>
    }

    return (

        <>
            <div className="container d-flex flex-column align-items-center justify-content-center h-100 vh-100">
                <div className="box1 m-0">{renderStateView}</div>
                <PopUp trigger={trigger} message={errorMessage} color={"redBg whiteText"}></PopUp>
            </div>
        </>




    );
}

export default AuctionCustomer;