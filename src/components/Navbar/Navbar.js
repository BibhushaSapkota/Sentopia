import React, { useState } from 'react';
import { HashLink as Link} from 'react-router-hash-link';
import Cart from '../Cart/Cart';

import './Navbar.css';


const Navbar = () => {
  const [showCart, setshowCart] = useState(false);
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to the home page
    window.location.href = '/';
  };

  const isLoggedIn = localStorage.getItem('token');
  let loginOrLogoutButton;
  let cartButton;

  if (isLoggedIn) {
    cartButton = (
      <button onClick={() => setshowCart(true)}>
        Cart
      </button>
    );
    loginOrLogoutButton = (
      <button onClick={handleLogout}>Logout</button>
    );

  } else {
    
      loginOrLogoutButton = (
        <button onClick={() => { window.location.href = '/login'; }}>
          Login
        </button>
      );
    }

  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <a href="/">Sentopia   </a>
      </div>
      <div className="links">
        <a><Link to="#about-us">About Us</Link></a>
        <a><Link to="#top-products">Top products</Link></a>
        <a><Link to="#contact-us">Contact Us</Link></a>

      </div>
      <div className="dropdown">
        <button className="dropbtn">Categories</button>
        <div className="dropdown-content">
          <a href="/products">Candle</a>
          <a href="/products">Fragrance</a>
        </div>
      </div>

      <div className="login-button">
        {cartButton}
        {loginOrLogoutButton}
      </div>
    </nav>
    {showCart && <Cart setshowCart={setshowCart} />}
    </>
  );
};

export default Navbar;
