import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useColors from "../../hooks/useColors";
import LoaderSpinner from "../loader";
import styles from "./style.module.css";

const ColorCarousel = ({ onColorSelect, colors }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const carouselSettings = {
    infinite: true,
    swipeToSlide: true,
    arrows: false,
    centerPadding: "10px",
    adaptiveHeight: true,
    slidesToShow: 10,
    speed: 500, // Adjust the speed (lower value makes it faster)
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller laptops
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // Tablets and large phones
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 480, // Small phones
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  const handleColorSelect = (color) => {
    // Update the selected color and call the callback function
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div className={styles["slider-color-container"]}>
      <Slider {...carouselSettings} className={styles["color-carousel"]}>
        {colors.map((color, index) => (
          <div
            key={color._id}
            className={`${styles["color-image-container"]} $`}
          >
            <div
              className={`${styles["color-code"]} ${
                selectedColor && selectedColor._id === color._id
                  ? styles["active-color"]
                  : ""
              }`}
              style={{
                backgroundColor: color.code,
                cursor: "pointer",
                borderRadius: "300px",
              }}
              onClick={() =>
                handleColorSelect({
                  ...color,
                  nr: (index + 1).toString().padStart(3, "0"),
                })
              }
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ColorCarousel;
