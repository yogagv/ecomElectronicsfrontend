import React from 'react'
import { FaCar } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import './features.css'
const Features = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                        <div className="col-md-3">
                            <div class="card" style={{ width: "20rem", height: "10rem", backgroundColor:"#FEEEE6" }}>
                                <div class="card-body">
                                <FaCar size={25} className='icon mt-4'/>
                                    <h6 class="card-title text-bold mt-3">Free Shipping</h6>
                                    <p class="card-text ms-5">Lorem ipsum dolor sit amet, </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card" style={{ width: "20rem", height: "10rem", backgroundColor:"#CDEBE8" }}>
                                <div class="card-body">
                                <IoCard size={25} className='icon mt-4'/>
                                    <h6 class="card-title text-bold mt-3">Safe Payment</h6>
                                    <p class="card-text ms-5">Lorem ipsum dolor sit amet, </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card" style={{ width: "20rem", height: "10rem", backgroundColor:"#E4F1B3" }}>
                                <div class="card-body">
                                    <FaShieldAlt size={25} className='icon mt-4'/>
                                    <h6 class="card-title text-bold mt-3">Secure Payment</h6>
                                    <p class="card-text ms-5">Lorem ipsum dolor sit amet, </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div class="card" style={{ width: "20rem", height: "10rem", backgroundColor:"#D6E4FA" }}>
                                <div class="card-body">
                                <FaHeadphones size={25} className='icon mt-4'/>
                                    <h6 class="card-title text-bold mt-3">Back Guarantee</h6>
                                    <p class="card-text ms-5">Lorem ipsum dolor sit amet, </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Features