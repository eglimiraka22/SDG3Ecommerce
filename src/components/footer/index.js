import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo-sdg3.jpg";

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-left'>
          <a href='/' className='footer-logo'>
            {" "}
            Sdg3- Cosmetics
            <img src={logo} width={50} height={50} alt='SDG3' />
          </a>
        </div>
        <div className='footer-right'>
          <div className='footer-list'>
            <h5 className='footer-title'>Sherbimet</h5>
            <ul>
              <li>
                <Link to='/product-category?tipi=Syze+Dielli'>Cosmetics</Link>
              </li>
              <li>
                <Link to='/product-category?tipi=Syze'>Shipping all🌍</Link>
              </li>
              <li>
                <Link to='/product-category'>Warehouse prices</Link>
              </li>
              <li>
                <Link to='/product-category?gender=Femije'>High Quality</Link>
              </li>
            </ul>
          </div>
          <div className='footer-list'>
            <h5 className='footer-title'>Informacione</h5>
            <ul>
              <li>
                <Link to='/about-us'>Rreth Nesh</Link>
              </li>
              <li>
                <Link to='/contact'>Lokacioni</Link>
              </li>
            </ul>
          </div>
          <div className='footer-list'>
            <h5 className='footer-title'>Kontakt</h5>
            <div className='footer-contact'>
              <p className=''>sdg3nailsgel@yahoo.com</p>
              <p className=''>
                Phone & WhatsApp :<br /> <br /> +355 69 293 1556 <br /> +355 69
                279 2534
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>© 2023 Sdg3 cosmetics. Të gjitha të drejtat e rezervuara.</p>
      </div>
    </footer>
  );
};

export default Footer;
