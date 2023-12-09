import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import "./style.css";
import CartButton from "../../components/buttons/cart-view-button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../fonts/font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import { ToastContainer, toast } from "react-toastify";

import useCreateOrder from "../../hooks/useCreateOrder";
import { nanoid } from "nanoid";
import useCurrency from "../../hooks/useCurrency";
import LoaderSpinner from "../../components/loader";
const CheckoutView = ({ onorderComplete }) => {
  useScrollTop(1);

  const navigate = useNavigate();
  const { isLoading, error, createOrder } = useCreateOrder();

  const { convertCurrency, convertPriceStringValue } = useCurrency();

  const cartCtx = useContext(CartContext);
  const updatedItems = cartCtx.items.map((item) => ({
    ...item,
    cmimi: convertCurrency(item.cmimi),
  }));

  // Create a new cart context with the updated items
  const products = {
    ...cartCtx,
    items: updatedItems,
  };

  const formik = useFormik({
    initialValues: {
      Emri: "",
      Mbiemri: "",
      Shteti: "",
      Qyteti: "",
      Adresa: "",
      Email: "",
      Numri: "",
      Shenime: "",
    },
    validationSchema: Yup.object({
      Emri: Yup.string().required("Emri duhet te plotesohet"),
      Mbiemri: Yup.string().required("Mbiemri duhet te plotesohet"),
      Shteti: Yup.string().required("Shteti duhet te plotesohet"),
      Qyteti: Yup.string().required("Qyteti duhet te plotesohet"),
      Adresa: Yup.string().required("Adresa duhet te plotesohet"),
      Email: Yup.string()
        .email("Emaili nuk eshte i sakte")
        .required("Emaili duhet te plotesohet"),
      Numri: Yup.string()
        .matches(
          /^[+0-9]{7,15}$/, // Updated regular expression for 7 to 12 characters including '+'
          "Numri i telefonit nuk eshte i sakte",
        )
        .required("Numri i telefonit duhet te plotesohet"),
    }),
  });
  const [selectedMerreneDyqan, setSelectedMerreneDyqan] = useState(false);

  const handleMethodSelect = () => {
    setSelectedMerreneDyqan(!selectedMerreneDyqan);
  };

  const Totali = products.items.reduce(
    (acc, product) => acc + product.cmimi * product.sasia,
    0,
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field has been touched and there are no errors
    if (formik.dirty && Object.keys(formik.errors).length === 0) {
      // Handle form submission here

      const orderData = {
        Emri: formik.values.Emri || "", // Ensure no undefined values
        Mbiemri: formik.values.Mbiemri || "",
        Shteti: formik.values.Shteti || "",
        Qyteti: formik.values.Qyteti || "",
        Adresa: formik.values.Adresa || "",
        Email: formik.values.Email || "",
        Numri: formik.values.Numri || "",
        Shenime: formik.values.Shenime || "",
        Status: "Pending", // Default status
        OrderDetails: products.items.map((product) => ({
          _key: nanoid(), // Generate a unique key
          name: product.emri || "", // Ensure no undefined values
          productColor: product.color ? product.color.nr : "",
          productPrice: product.cmimi
            ? `${product.cmimi} ${products.currency}`
            : "", // Ensure a default value if cmimi is undefined
          productQuantity: product.sasia || 0, // Ensure a default value if sasia is undefined
        })),
        Totali: `${convertPriceStringValue(Totali.toFixed(2))}`, // Ensure a default value if Totali is undefined
      };

      createOrder(orderData);

      products.clearCart();

      formik.resetForm();
      navigate("/");
      onorderComplete();
    } else {
      toast.error("Fill out the form!", {
        position: "top-center",
        autoClose: 800,
      });
    }
  };

  if (isLoading || error) {
    return <LoaderSpinner />;
  }
  return (
    <div className='checkout-container'>
      <ToastContainer />
      <div id='google-map-two'>
        <div className='map-canvas'></div>
      </div>

      <div className='checkout-billing'>
        <h1 className='checkout-billing-title'>Billing Address</h1>
        <div className={`checkout-name `}>
          <div
            className={`${
              formik.touched.Emri && formik.errors.Emri ? "error" : ""
            }`}
          >
            <input
              type='text'
              name='Emri'
              placeholder='Name*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Emri}
            />
            {formik.touched.Emri && formik.errors.Emri && (
              <p className='error-message'>{formik.errors.Emri}</p>
            )}
          </div>

          <div
            className={`${
              formik.touched.Mbiemri && formik.errors.Mbiemri ? "error" : ""
            }`}
          >
            <input
              type='text'
              name='Mbiemri'
              placeholder='Last Name*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Mbiemri}
            />
            {formik.touched.Mbiemri && formik.errors.Mbiemri && (
              <p className='error-message'>{formik.errors.Mbiemri}</p>
            )}
          </div>
        </div>

        <div
          className={`checkout-Shteti ${
            formik.touched.Shteti && formik.errors.Shteti ? "error" : ""
          }`}
        >
          <input
            type='text'
            name='Shteti'
            placeholder='Country*'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Shteti}
          />
          {formik.touched.Shteti && formik.errors.Shteti && (
            <p className='error-message'>{formik.errors.Shteti}</p>
          )}
        </div>
        <div
          className={`checkout-Qyteti ${
            formik.touched.Qyteti && formik.errors.Qyteti ? "error" : ""
          }`}
        >
          <input
            type='text'
            name='Qyteti'
            placeholder=' City*'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Qyteti}
          />
          {formik.touched.Qyteti && formik.errors.Qyteti && (
            <p className='error-message'>{formik.errors.Qyteti}</p>
          )}
        </div>
        <div
          className={`checkout-address ${
            formik.touched.Adresa && formik.errors.Adresa ? "error" : ""
          }`}
        >
          <input
            type='text'
            name='Adresa'
            placeholder=' Address*'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Adresa}
          />
          {formik.touched.Adresa && formik.errors.Adresa && (
            <p className='error-message'>{formik.errors.Adresa}</p>
          )}
        </div>

        <div className={`checkout-contact `}>
          <div
            className={`${
              formik.touched.Email && formik.errors.Email ? "error" : ""
            }`}
          >
            <input
              type='text'
              name='Email'
              placeholder='Email Address*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
            />
            {formik.touched.Email && formik.errors.Email && (
              <p className='error-message'>{formik.errors.Email}</p>
            )}
          </div>

          <div
            className={`${
              formik.touched.Numri && formik.errors.Numri ? "error" : ""
            }`}
          >
            <input
              type='text'
              name='Numri'
              placeholder='Phone Nr (Whatsapp Number)*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Numri}
            />
            {formik.touched.Numri && formik.errors.Numri && (
              <p className='error-message'>{formik.errors.Numri}</p>
            )}
          </div>
        </div>
        <div className='checkout-notes'>
          <textarea
            name='Shenime'
            placeholder='Notes(Optional)'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Shenime}
          />
        </div>
      </div>

      <div className='checkout-orders-container'>
        <h1 className='checkout-orders-title'>Billing</h1>

        <div className='checkout-order'>
          <div className='checkout-orders-details'>
            <h1 className='checkout-orders-fatura'>Order Details</h1>

            <div className='checkout-orders-details-products'>
              {products.items.map((product, index) => (
                <div className='checkout-orders-details-product' key={index}>
                  <div className='checkout-orders-details-product-name'>
                    <p>{product.emri}</p>
                    {product.color && (
                      <span
                        className='cart-products-product-info-color'
                        style={{
                          backgroundColor: `${product.color.code}`,
                          height: "20px",
                          width: "20px",
                        }}
                      ></span>
                    )}
                  </div>
                  <div className='checkout-orders-details-product-price'>
                    <span className='checkout-orders-details-product-quantity'>
                      X {product.sasia}
                    </span>
                    <p>{convertPriceStringValue(product.cmimi)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='checkout-orders-details-total'>
              <p>Total: </p>
              <p>{convertPriceStringValue(Totali.toFixed(2))}</p>
            </div>
          </div>
          <div className='checkout-orders-payment'>
            <div className='checkout-orders-payment-title'>
              <h3>Payment Method</h3>
            </div>
            <div className='payment-methods'>
              <div
                className={`payment-method selected`}
                onClick={handleMethodSelect}
              >
                <div className='circle'>
                  <span>&#10003;</span>
                </div>
                <span>Cash Payment On Delivery</span>
              </div>
            </div>
          </div>
          <div className='checkout-data-protection-container'>
            <p>
              Your personal data will be use for your order, support your
              experience through this website & for other purpose described in
              our privacy policy
            </p>
          </div>

          <div className='checkout-orders-submit'>
            <CartButton title='Place Order' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
