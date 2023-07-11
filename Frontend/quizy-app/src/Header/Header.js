import React, { useState, useContext } from "react";
import logo from '../assets/quiz-icon.jpg';
import { UserContext } from '../App/App';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = useContext(UserContext).user
  const navigate = useNavigate()
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"><img src={logo} alt="header" width="40" className="d-inline-block" /><strong>Quizy App</strong></a>
      <div className="collapse navbar-collapse custom-flex" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li className="nav-item nav-link active"><Link to="/">Home</Link></li>
          <li className="nav-item nav-link"><Link to="/about">About</Link></li>
          <li className="nav-item nav-link"><Link to="/help">Help</Link></li>
          {user ?
          <li className="nav-item nav-link" onClick={() => {
            localStorage.removeItem("QuizyUser")
            window.location.reload()
          }}>Log Out</li>
          :
          <li className="nav-item nav-link"><Link to="/login">Log In</Link></li>}
        </div>
      </div>
    </nav>
    </>
  );
}

export default Header;