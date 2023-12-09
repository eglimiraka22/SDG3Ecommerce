// AdminView.js

import React from "react";
import "./style.css";
import "../../fonts/font-awesome/css/font-awesome.css";
import AdminProducts from "./admin-products";

const AdminView = () => {
  return (
    <main>
      <div className='admin-container'>
        <h1>Welcome to Admin Dashboard</h1>
        <AdminProducts />
      </div>
    </main>
  );
};

export default AdminView;
