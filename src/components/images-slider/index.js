import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import SliderImages from "./SliderImages";

const ImagesSlider = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    arrows: false,
    lazyLoad: true,
    autoplaySpeed: 4500,

    responsive: [
      {
        breakpoint: 1156, // Tablets and smaller laptops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Tablets and large phones
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Small phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='carousel-content'>
      <div className='carousel-container'>
        <Slider {...settings}>
          {SliderImages.map((item, index) => (
            <div key={item.id} className='slider-image'>
              <img src={item.src} alt={item.alt} className={``} />
              <div className='slider-text'></div>
              <div className='slider-text-info'>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImagesSlider;
