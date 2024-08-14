import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsBagFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './footer.css'


const Footer = () => {
  return (
    <div>
    <div className='footer_one'>
    <div className="container">
    <div className="col-md-12">
      <div className="row">
      <div className="col-md-3 tourfooter">
        <div className="logo-container">
        <BsBagFill color='white' size={25} className='mt-5 logo-icon'/><span><h3 className='logo-text'>Mart</h3></span>
        </div>
          <p className='lh-sm' style={{color:"#768BA4"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, 
            in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
            <div className="social-icon">
            <FaGithub className='social'/> 
            <span className='ms-1 social'><FaInstagram /></span> 
            <span className='ms-1 social'><FaLinkedinIn /></span>
            <span className='social'> <TiSocialFacebook /></span>
            <span className='social'><FaXTwitter /></span>
            </div>
      </div>
      <div className="col-md-3 mt-5">
      <h5 className='text-light ms-2 mt-3'>About Us</h5>
      <h6 className='mt-4'>
      <Link to="/career" className='text-decoration-none fw-normal text-align-left'style={{color:"#768BA4"}} >Career</Link>
      </h6>
      <h6 className='mt-3'>
      <Link to="/ourstories" className='text-decoration-none fw-normal text-align-left' style={{color:"#768BA4"}}>Our Stores</Link>
      </h6>
      <h6 className='mt-3'>
      <Link to="/ourcares" className='text-decoration-none fw-normal text-align-left' style={{color:"#768BA4"}}>Our Cares</Link>
      </h6>
      <h6 className='mt-3'>
      <Link to="/terms&condition" className='text-decoration-none fw-normal text-align-left' style={{color:"#768BA4"}}>Terms & Condition</Link>
      </h6>
      <h6 className='mt-3'>
      <Link to="/privacypolicy" className='text-decoration-none fw-normal text-align-left' style={{color:"#768BA4"}}>Privacy Policy</Link>
      </h6>
      </div>
      <div className="col-md-3 mt-5">
      <h4>Quick Links</h4>
      <h6 className='mt-4'>
      <Link to="/gallery" className='text-decoration-none text-secondary fw-normal'>Gallery</Link>
      </h6>
      <h6 className='mt-4'>
      <Link to="/signin" className='text-decoration-none text-secondary fw-normal mt-5'>Login</Link>
      </h6>
      <h6 className='mt-4'>
      <Link to="/register" className='text-decoration-none text-secondary fw-normal mt-5'>Register</Link>
      </h6>
      </div>
      <div className="col-md-3 mt-5">
      <h4> Contact</h4>
      <h6 className='mt-4  text-dark'>
        <span className='contact'><FaMapMarkerAlt/>  </span>   
         Address: <span className='text-secondary fw-noraml'>Shimoga, Karnataka</span>
      </h6>
      <h6 className='mt-4  text-dark'>
      <span className='contact'><MdEmail />  </span>   
         Email: <span className='text-secondary fw-normal'>ait96@gmail.com</span>
      </h6>
      <h6 className='mt-4  text-dark'>
      <span className='contact'><FaPhone />  </span>   
         Contact: <span className='text-secondary fw-normal'>+91 90989 70459</span>
      </h6>
      </div>
    </div>
    </div>
    </div>
    <div className="container">
    <div className="col-md-12 mt-5">
        <h6 className='text-center text-secondary fw-normal'>Copyright 2024, Design and developed by Yogananthan. All rights reserved.</h6>
    </div>
    </div>
    </div>
        </div>
  )
}

export default Footer