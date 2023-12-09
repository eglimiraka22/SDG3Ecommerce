import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/header";
import { HomeView } from "./views/home-views";
import Footer from "./components/footer";
import ProductCategoryView from "./views/product-category-view";
import CheckoutView from "./views/checkout-view";
import CartView from "./views/cart-view";
import ProductView from "./views/product-view";
import LoginView from "./views/login-view";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUsView from "./views/about-us";
import ContactView from "./views/contact-view";
import AdminView from "./views/admin-view"; // Import the AdminView component
import ShamirView from "./views/shamir-view";
import OrdersView from "./views/order-view";
import AdminCategoriesView from "./views/admin-categories-view";
import AdminColorsView from "./views/admin-colors-view";
import AdminCurrencyView from "./views/admin-currency-view";
import AdminOfferView from "./views/admin-offer-view";

//TODO  Product path with params  /product/:id
function App() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true",
  );

  const handleLogin = () => {
    // Update isAdmin state when logged in
    setIsAdmin(true);

    toast.success("Logged in as Admin!", {
      position: "top-left",
      autoClose: 2000,
    });
  };
  const handleOrder = () => {
    toast.success(
      "Order Completed! We will contact you via email or phone number",
      {
        position: "top-left",
        autoClose: 2000,
      },
    );
  };

  // Use useEffect to update isAdmin state on component mount
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  return (
    <div className='main-page-wrapper'>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route index element={<HomeView />} />
          <Route path='/product-category' element={<ProductCategoryView />} />
          <Route path='/product/:id' element={<ProductView />} />
          <Route
            path='/checkout'
            element={<CheckoutView onorderComplete={handleOrder} />}
          />
          <Route path='/cart' element={<CartView />} />
          <Route path='/login' element={<LoginView onLogin={handleLogin} />} />
          <Route path='/about-us' element={<AboutUsView />} />
          <Route path='/contact' element={<ContactView />} />
          <Route path='/shamir' element={<ShamirView />} />

          {/* Protected Route for AdminView */}
          {isAdmin ? (
            <Route
              path='/admin/*'
              element={
                <Routes>
                  <Route index element={<AdminView />} />
                  <Route path='orders/*' element={<OrdersView />} />
                  <Route
                    path='categories/*'
                    element={<AdminCategoriesView />}
                  />
                  <Route path='colors/*' element={<AdminColorsView />} />
                  <Route path='currency/*' element={<AdminCurrencyView />} />
                  <Route path='oferta/*' element={<AdminOfferView />} />
                </Routes>
              }
            />
          ) : (
            // Redirect to home if not an admin
            <Route path='/admin/*' element={<Navigate to='/' />} />
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
