import React from "react";
import "./styles.css";
import TextHeader from "../../components/text-title";
import Card from "../../components/card";
import NewArrivalsCard from "../../components/new-arrivals-card";
import "../../fonts/font-awesome/css/font-awesome.css";
import nails1 from "../../images/nails-image.jpg";
import nails2 from "../../images/nails-image-2.jpg";
import nails3 from "../../images/nails-image-3.jpg";
import useScrollTop from "../../hooks/useScrollTop";
import useGetFeaturedProducts from "../../hooks/useGetFeaturedProducts";
import LoaderSpinner from "../../components/loader";
import HeaderSlider from "../../components/header-slider";
import OfferModal from "../../components/offer-modal";
import { Link } from "react-router-dom";
import CartButton from "../../components/buttons/cart-view-button";
import "../../fonts/font-awesome/css/font-awesome.css";

export const HomeView = () => {
  useScrollTop(1);
  const isOfferModalClosed =
    localStorage.getItem("offerModalClosed") === "true";
  const { loading, products } = useGetFeaturedProducts();

  const newArrivals = products.map((product) => {
    return (
      <NewArrivalsCard
        key={product._id}
        id={product._id} // Assuming you have an 'id' property for each product
        image={product.productImages[0].asset.url} // Replace 'image' with the actual property name
        name={product.name} // Replace 'name' with the actual property name
        price={product.price} // Replace 'price' with the actual property name
        discountPrice={product.discountPrice} // Replace 'price' with the actual property name
      />
    );
  });
  return (
    <>
      {loading && <LoaderSpinner />}
      <HeaderSlider />
      {!isOfferModalClosed && <OfferModal />}{" "}
      <main className='main-area'>
        <div className='product-homepage-header'>
          <p className='product-homepage-header-text'>
            Discover a world where beauty meets science at{" "}
            <span>SDG3 Cosmetics</span>. Our passion for skincare goes beyond
            boundaries, crafting products that redefine beauty standards.
            Indulge in a journey of self-expression and confidence with SDG3.
          </p>
        </div>
        <section className='our-products-section'>
          <TextHeader
            text='Categories
'
          />
          <div className='products'>
            <Card title='Cosmetics' imageUrl={nails1} link='Skincare' />
            <Card title='Nails' imageUrl={nails2} link='Nails' />
            <Card title='More Products' imageUrl={nails3} />
          </div>
        </section>

        <section className='new-arrivals'>
          <TextHeader text='Products in Discount' />
          <div className='new-arrivals-container'>{newArrivals}</div>
        </section>
        <section className='about-us-contact'>
          <div className='about-us-contact-container'>
            <h1>Explore Our Nail Art Collections</h1>

            <Link className='contact-us-link' to={"/contact"}>
              <CartButton title={"Contact us"} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
