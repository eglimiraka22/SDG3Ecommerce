import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { RiShoppingCartFill } from "react-icons/ri";
import CartDropdown from "../cart-dropdown";
import CartContext from "../../store/cart-context";
import logo from "../../images/logo-sdg3.jpg";
import "../../fonts/font-awesome/css/font-awesome.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import AddProductModal from "../add-products-modal";
import CurrencyDropdown from "../currency-dropdown";

function Navbar() {
  const navigate = useNavigate();
  console.log("TEST")

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const cartCtx = useContext(CartContext); // Access the addItemToCart function from the CartContext
  const [openHapProductModal, setHapAddProductModal] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isNavSticky, setIsNavSticky] = useState(false); // Track whether the navbar should have a margin
  const [prevScrollY, setPrevScrollY] = useState(0); // Track the previous scroll position
  // const [isDropdown, setIsDropdown] = useState({
  //   syzeDropdown: false,
  //   syzeDielliDropdown: false,
  //   markatDropdown: false,
  // });
  // ADD PRODUCTS MODAL HANDLERS
  const HapAddProductModatHandler = () => {
    setHapAddProductModal(true);
  };
  const MbyllAddProductModatHandler = () => {
    setHapAddProductModal(false);
  };

  // Log OUT

  const handleLogout = () => {
    // Remove isAdmin from local storage
    localStorage.removeItem("isAdmin");

    // Perform any additional logout logic if needed
    navigate("/");
    // Redirect or perform other actions after logout
  };

  const handleAdminView = () => {
    isAdmin ? navigate("/admin") : navigate("/product-category");
  };
  const [isShportaDropdown, setIsShportaDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toogleShportaDropdown = () => {
    setIsShportaDropdown(!isShportaDropdown);
  };

  const closeDropdown = () => {
    setIsShportaDropdown(false);
  };
  let scrollTimeout;

  const handleScroll = () => {
    clearTimeout(scrollTimeout);
  
    scrollTimeout = setTimeout(() => {
      const currentScrollY = window.scrollY;
  
      // Hide the navbar when scrolling down
      if (window.scrollY > 60) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
  
      // Reveal the navbar when scrolling all the way up
      setPrevScrollY(currentScrollY);
    }, 100); // Adjust the debounce delay as needed
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    cartCtx.changeCurrency(newCurrency);
    window.location.reload();
  };
  return (
    <>
      {isAdmin && (
        <div className='navigation-admin'>
          <ul>
            <li>Logged in as Admin</li>
            <li onClick={handleAdminView}>View Products</li>
            <li onClick={HapAddProductModatHandler}>
              <Link to={"/admin"}>Add products</Link>
            </li>
            <li>
              <Link to={"/admin/categories"}>Categories</Link>
            </li>
            <li>
              <Link to={"/admin/colors"}>Colors</Link>
            </li>
            <li>
              <Link to={"/admin/currency"}>Currency</Link>
            </li>
            <li>
              <Link to={"/admin/orders"}>Orders</Link>
            </li>
            <li>
              <Link to={"/admin/oferta"}>Oferta</Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
 <nav
        className={`navigation  ${isNavSticky ? "sticky " : ""}`}
      >        <div className='navigation-items'>
          <>
            <button
              className='hamburger '
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              {/* icon from heroicons.com */}

              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='white'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </>
          <div className='brand-logo'>
            <a href='/' className='brand-name'>
              <img src={logo} width={50} height={50} alt='SDG3' />
            </a>
          </div>
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            {isNavExpanded && (
              <h1 className='navigation-list-title'>
                MENU{" "}
                <button
                  className='close-menu '
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    color='white'
                    viewBox='0 0 25 25'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </h1>
            )}
            <ul className='list'>
              <li className='list-item'>
                <NavLink
                  className='item'
                  to={"/"}
                  exact='true'
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  activeclassname='active' // Specify the class for the active link
                >
                  <span className='item-icon'>Home</span>
                </NavLink>
              </li>

              <li className='list-item'>
                <NavLink
                  className='item'
                  to={"/product-category"}
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  exact='true'
                  activeclassname='active' // Specify the class for the active link
                >
                  <span className='item-icon'>Products</span>
                </NavLink>
              </li>

              <li className='list-item'>
                <NavLink
                  className='item'
                  to='/about-us'
                  exact='true'
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  activeclassname='active'
                >
                  About us
                </NavLink>
              </li>

              <li className='list-item'>
                <NavLink
                  className='item'
                  to='/contact'
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  activeclassname='active' // Specify the class for the active link
                  exact='true'
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <CurrencyDropdown
            currency={cartCtx.currency}
            onCurrencyChange={handleCurrencyChange}
          />

          {!isAdmin && (
            <div className='navigation-search'>
              <span className='navigation-icon' ref={dropdownRef}>
                <span
                  className='navigation-icon-cart'
                  onClick={toogleShportaDropdown}
                >
                  <RiShoppingCartFill size={28} />{" "}
                  {cartCtx.items.length > 0 && (
                    <span className='cart-items-icon'>
                      {cartCtx.items.length}
                    </span>
                  )}
                </span>

                {isShportaDropdown && (
                  <div>
                    <CartDropdown closeDropdown={closeDropdown} />
                  </div>
                )}
              </span>
            </div>
          )}
        </div>
        <div></div>
      </nav>

      <AddProductModal
        isOpen={openHapProductModal}
        onRequestClose={MbyllAddProductModatHandler}
      />
    </>
  );
}

export default Navbar;
