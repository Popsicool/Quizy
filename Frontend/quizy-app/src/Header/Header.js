import React from "react";
import logo from '../assets/quiz-icon.jpg';
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <a className="navbar-brand" href="#"><img src={logo} alt="header" width="40" className="d-inline-block" /><strong>Quizy App</strong></a>
      <div className="collapse navbar-collapse custom-flex" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">Home</a>
          <a className="nav-item nav-link" href="#">About</a>
          <a className="nav-item nav-link" href="#">Log in</a>
          <a className="nav-item nav-link" href="#">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Header;