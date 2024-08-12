import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderData from '../sliderdata.js'

const Hero = () => {

    const settings = {

        dots: false,
        arrows: true,   
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

      };

  return (
    <div className='mt-5'>
        <div className="container">
    <Slider {...settings}>
        
    </Slider>
    </div>
        </div>
  )
}

export default Hero