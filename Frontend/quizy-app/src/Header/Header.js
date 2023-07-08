import React from "react";
import logo from '../assets/quiz-icon.jpg';
import Category from "../Category/Category";
import './Header.css';

function Header() {
  return (
    <div className="header_menu">
      <img src={logo} alt="header" />
      <div className="header_categories">
        <div className="categories">
          <h1>Categories</h1>
          <Category />
        </div>
        <h1>About</h1>
        <h1>Help</h1>
      </div>
      <h1>Sign Up/Log in</h1>
    </div>
  );
}

export default Header;