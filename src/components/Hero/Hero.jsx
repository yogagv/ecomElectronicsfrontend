import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderData from '../sliderdata.js'
import './hero.css'

const Hero = () => {

    const settings = {

        dots: false,
        arrows: true,   
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

      };

      const firstSlide = sliderData[0];
      const secondSlide = sliderData[1];
      const thirdSlide = sliderData[2];
      const fourthSlide = sliderData[3];

  return (
    <div className='hero'>
        <div className="container">
    <Slider {...settings} className='slider'>
      <div className='col-md-12 col-sm-12'>
        <div className="row">
        <div className='col-md-6 col-sm-12 mt-5'>
        <h1 className='slideone'>{firstSlide.title}</h1>
        <p>{firstSlide.desc}</p>
        <button className='mt-2 visitbutton'>Visit Collections</button>
          </div>
          <div className='col-md-6 col-sm-12 mt-5'>
            <img src={firstSlide.cover} className='sliderimg' alt="" />
          </div>
          </div>
          </div>
          <div className='col-md-12 col-sm-12'>
        <div className="row">
        <div className='col-md-6 col-sm-12 mt-5'>
        <h1 className='slideone'>{secondSlide.title}</h1>
        <p>{secondSlide.desc}</p>
        <button className='mt-2 visitbutton'>Visit Collections</button>
          </div>
          <div className='col-md-6 col-sm-12 mt-5'>
            <img src={secondSlide.cover} className='sliderimg' alt="" />
          </div>
          </div>
          </div>
          <div className='col-md-12 col-sm-12'>
        <div className="row">
        <div className='col-md-6 col-sm-12 mt-5'>
        <h1 className='slideone'>{thirdSlide.title}</h1>
        <p>{thirdSlide.desc}</p>
        <button className='mt-2 visitbutton'>Visit Collections</button>
          </div>
          <div className='col-md-6 col-sm-12 mt-5'>
            <img src={thirdSlide.cover} className='sliderimg' alt="" />
          </div>
          </div>
          </div>
          <div className='col-md-12 col-sm-12'>
        <div className="row">
        <div className='col-md-6 col-sm-12 mt-5'>
        <h1 className='slideone'>{fourthSlide.title}</h1>
        <p>{fourthSlide.desc}</p>
        <button className='mt-2 visitbutton'>Visit Collections</button>
          </div>
          <div className='col-md-6 col-sm-12 mt-5'>
            <img src={fourthSlide.cover} alt="" className='slidefour' />
          </div>
          </div>
          </div>
    </Slider>
    </div>
        </div>
  )
}

export default Hero