import React from "react";
import logo from '../assets/quiz-icon.jpg';
import './Header.css';

function Header() {
  return (
    <div className="header_menu">
      <img src={logo} alt="header" />
      <div className="menus">
        <div className="home">
          <h1>Home</h1>
        </div>
        <div className="about">
          <h1>About</h1>
        </div>
        <div className="help">
          <h1>Help</h1>
        </div>
        <div className="auth">
          <h1>Sign Up/Log in</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;