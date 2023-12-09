// HeaderSlider.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage from "../../images/slider-image-1.jpg";
import sliderImage2 from "../../images/slider-image-2.jpeg";
import sliderImage3 from "../../images/slider-image-3.jpeg";
import "../../fonts/font-awesome/css/font-awesome.css";

import "./style.css"; // Import your CSS file
import { Link } from "react-router-dom";

const HeaderSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className='containerSlider'>
      <Slider {...settings}>
        <div className='slide-container'>
          <img src={sliderImage} alt='image1' />
          <div className='slide-content'>
            <h2>Welcome to SDG3 Cosmetics</h2>
            <p>Your source for premium beauty products.</p>
            <Link
              onClick={() => {
                window.location.href = `/product-category`;
              }}
              className='shop-now-button'
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className='slide-container'>
          <img src={sliderImage2} alt='image2' />
          <div className='slide-content'>
            <h2>Discover Beauty with SDG3 Cosmetics</h2>
            <p>Explore our exclusive collection for a radiant look.</p>
            <Link
              onClick={() => {
                window.location.href = `/product-category`;
              }}
              className='shop-now-button'
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className='slide-container'>
          <img src={sliderImage3} alt='image3' />
          <div className='slide-content'>
            <h2>Embrace Elegance, Choose SDG3 Cosmetics</h2>
            <p>Indulge in luxurious beauty experiences with us.</p>
            <Link
              onClick={() => {
                window.location.href = `/product-category`;
              }}
              className='shop-now-button'
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeaderSlider;
