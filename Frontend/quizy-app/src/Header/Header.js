import React from "react";
import logo from '../assets/quiz-icon.jpg';
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"><img src={logo} alt="header" /></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="menus">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home</a>
            <a className="nav-item nav-link" href="#">About</a>
            <a className="nav-item nav-link" href="#">Log in</a>
            <a className="nav-item nav-link" href="#">Sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;