import React from "react";
import logo from '../assets/quiz-icon.jpg';
import { Link } from "react-router-dom"
import './Header.css';

function Header() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"><img src={logo} alt="header" width="40" className="d-inline-block" /><strong>Quizy App</strong></a>
      <div className="collapse navbar-collapse custom-flex" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li><Link to="/" className="nav-item nav-link active">Home</Link></li>
          <li><Link to="/about" className="nav-item nav-link">About</Link></li>
          <li><Link to="/help" className="nav-item nav-link">Help</Link></li>
          <li><Link to="/login" className="nav-item nav-link">Log In</Link></li>
          <li><Link to="/signup" className="nav-item nav-link">Sign Up</Link></li>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Header;