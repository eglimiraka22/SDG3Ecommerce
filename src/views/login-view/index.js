// LoginView.js

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '../../config'; // Import the config file with Username and Password Static
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginView = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required').min(1),
      password: Yup.string().required('Password is required').min(1),
    }),
    onSubmit: (values) => {
      // Check for empty fields
      if (!values.username || !values.password) {
        setError('Both username and password are required');
        return;
      }

      // Check for valid credentials
      if (
        values.username === config.adminUsername &&
        values.password === config.adminPassword
      ) {
        localStorage.setItem('isAdmin', 'true');
        onLogin();
        navigate('/');
      } else {
        setError('Invalid credentials');
        // Clear form on error
        formik.resetForm();
      }
    },
  });

  const handleInputChange = (e) => {
    // Clear error when the user starts typing again
    setError(null);
    formik.handleChange(e);
  };

  return (
    <main>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="login-container">
          <h1>Login.</h1>
          <div className="login-input">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`login-input-username ${
                formik.touched.username && formik.errors.username
                  ? 'required'
                  : ''
              }`}
            />
          </div>

          <div className="login-input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`login-input-password ${
                formik.touched.password && formik.errors.password
                  ? 'required'
                  : ''
              }`}
            />
          </div>

          {error && <p className="error-login">{error}</p>}

          <div className="login-button">
            <button type="submit" className="">
              Login
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginView;
