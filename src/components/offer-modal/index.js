import React, { useEffect, useState } from "react";
import { getOfferAction } from "../../utils/offer/offer";
import "./style.css"; // Import your custom styles for the modal
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const OfferModal = () => {
  const [offerModal, setOfferModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOfferAction();
      setOfferModal(result);
      setModalIsOpen(true);
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once
  const handleClose = () => {
    // Set a value in local storage to indicate the modal has been closed
    localStorage.setItem("offerModalClosed", "true");
    setModalIsOpen(false);
  };

  console.log(offerModal)
  if (!modalIsOpen  || !offerModal.activeOffer) {
    return null;
  }

  return (
    <div className='modal-offer-overlay'>
      <div className='offer-modal'>
        <div className='modal-offer-content'>
          <img src={offerModal.offerImage.asset.url} alt={offerModal.title} />
          <button onClick={handleClose} className='modal-offer-content-btn'>
            <MdClose size={35} fill='white' />
          </button>

          <Link
            to={"/product-category?discount=inDiscount"}
            className='modal-offer-content-products'
          >
            Discounts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
