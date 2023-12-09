// AboutUsView.jsx

import React from "react";
import "./style.css";
import "../../fonts/font-awesome/css/font-awesome.css";
import { AiOutlineRight } from "react-icons/ai";
// import ImagesSlider from "../../components/images-slider";
import CartButton from "../../components/buttons/cart-view-button";
import { Link } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import aboutImage from "../../images/about-image-1.png";
import aboutImage2 from "../../images/about-image-2.jpg";
import ImagesSlider from "../../components/images-slider";
import TextHeader from "../../components/text-title";

const AboutUsView = () => {
  useScrollTop(1);

  return (
    <main>
      <section className='about-us-header'>
        <p>About Us</p>
      </section>

      <section className='about-us-history'>
        <div className='about-us-history-container'>
          <div className='history-img'>
            <img src={aboutImage} alt='' />
          </div>

          <div className='history-text'>
            <h3>SDG3 Nails Company</h3>

            <p>
              SDG3 company offers certified for USA and EU standard Nails
              Gel. We have a variety of colors for our customers to choose from
              and are launching new colors every time! 
              <br /> SDG3 company is located in Tirana capital city of Albania
              in Europe. Start-up beauty brand founded in 2018, cooperating with
              the manufacturing company for over 17 years in the nail gel
              product manufacturing market in China, that produce for SDG3
              company. The quality of all products is approved from SDG3 company
              and all products are highly quality and certified, because we
              export in different Europeans's countries,  so we are obliged to
              sell only high quality and certified products for countries in
              Europe and more.
            </p>
          </div>
        </div>
        <div className='about-us-goal-container'>
          <div className='history-img'>
            <img src={aboutImage2} alt='' />
          </div>

          <div className='history-text'>
            <h3>Our Nail Artistic Vision</h3>

            <p>
              SDG3 brand was founded with a lovely heart and a lofty objective:
              to create salon-quality, carefully sourced nail and gel polishes
              for healthy, beauty, and delicate nails. We decided to bring
              together a community of passionate nail specialists to build your
              favorite one-stop shop for all things nails. This decision came
              from our desire to consider the well-being of our customers. “To
              compromise” was never the answer! We have a simple offer:
              beautiful and high-quality products at an affordable price; for
              beauty addicts who love to discover new products every time! Be
              careful because you'll get addicted fast! Who Is SDG3? Simply,
              your trust and best friend! And as your Trust and Best Friend, it:
              <br />
              <b>
                TEMPTS  you: by offering you amazing deals to get your favorite
                products at extraordinary prices!
              </b>
            </p>
          </div>
        </div>
      </section>

      <section className='about-us-slider'>
        <TextHeader text='Product Specifications' />
        <ImagesSlider />
      </section>
    </main>
  );
};

export default AboutUsView;
