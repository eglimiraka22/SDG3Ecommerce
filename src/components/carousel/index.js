import React, {useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.css';
import CarouselImages from './CarouselImages';
import TextHeader from '../text-title';

const Carousel = (props) => {
    const [activeSlide, setActiveSlide] = useState(0); // Initialize activeSlide state

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    
        swipeToSlide: true,
        autoplay: true,
        arrows: false,
        lazyLoad: true,
        centerPadding: "10px",
        autoplaySpeed: 3500,
        adaptiveHeight: true,
        centerMode: true, // Center the active slide
        beforeChange: (current, next) => setActiveSlide(next), // Update activeSlide on slide change
        responsive: [
            {
                breakpoint: 1024, // Tablets and smaller laptops
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // Tablets and large phones
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480, // Small phones
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                },
            },
        ]
    };

    return (
        <div className="carousel-content">
            <div className="carousel-container">
                <Slider {...settings}>
                    {CarouselImages.map((item, index) => (
                        <div key={item.id}>
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={`img ${index === activeSlide ? 'active' : ''}`}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;