import React, { useState } from "react";
import "./style.css";
import CartButton from "../../components/buttons/cart-view-button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../fonts/font-awesome/css/font-awesome.css";
import { BiLogoFacebook, BiLogoInstagram, BiLogoGmail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import MapOptika from "../../components/map";

const CheckoutView = () => {
  useScrollTop(1);

  const navigate = useNavigate();

  const [FormError, setFormError] = useState(false);
  const formik = useFormik({
    initialValues: {
      Email: "",
      Subject: "",

      Message: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Emaili nuk eshte i sakte")
        .required("Emaili duhet te plotesohet"),
      Message: Yup.string().required("Mesazhi duhet te plotesohet"),
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field has been touched and there are no errors
    if (formik.dirty && Object.keys(formik.errors).length === 0) {
      // Create a mailto link
      const mailtoLink = `mailto:sdg3nailsgel@yahoo.com?subject=${encodeURIComponent(
        formik.values.Subject,
      )}&body=${encodeURIComponent(formik.values.Message)}`;

      // Open the user's email client
      window.location.href = mailtoLink;
    } else {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
    }
  };
  return (
    <>
      <MapOptika />
      <div className='contact-container'>
        <div className='contact-form'>
          <div className={`contact-contact `}>
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
          </div>
          <div className={`contact-name `}>
            <div
              className={`${
                formik.touched.Subject && formik.errors.Subject ? "error" : ""
              }`}
            >
              <input
                type='text'
                name='Subject'
                placeholder='Subject (Optional)'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Subject}
              />
              {formik.touched.Subject && formik.errors.Subject && (
                <p className='error-message'>{formik.errors.Subject}</p>
              )}
            </div>
          </div>

          <div className={`contact-name `}>
            <div
              className={`${
                formik.touched.Message && formik.errors.Message ? "error" : ""
              }`}
            >
              <textarea
                type='text'
                name='Message'
                placeholder='Message*'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Message}
              />
              {formik.touched.Message && formik.errors.Message && (
                <p className='error-message'>{formik.errors.Message}</p>
              )}
            </div>
          </div>
          <div className='contact-form-submit'>
            <div>
              <CartButton title='Send Message' onClick={handleSubmit} />
            </div>
          </div>

          <p className={`submit-message ${FormError ? "error" : ""}`}>
            Plotesoni te dhenat !
          </p>
        </div>

        <div className='contact-text-area'>
          <div className='text-area-contact-container'>
            <p>Mos hezitoni te na kontaktoni per cdo informacion</p>
            <div className='contact-media'>
              <p>
                <a
                  href='https://www.instagram.com/sdg3cosmetics.co/
              '
                >
                  <BiLogoInstagram size={25} fill='gray' />
                </a>
              </p>
              <p>
                <BiLogoGmail size={25} fill='gray' />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
