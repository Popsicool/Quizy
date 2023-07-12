import React, { useState, useContext } from "react";
import logo from '../assets/quiz-icon.jpg';
import { UserContext } from '../App/App';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = useContext(UserContext).user
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"><img src={logo} alt="header" width="40" className="d-inline-block" /><strong>Quizy App</strong></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
      </div>
    </nav>
    </>
  );
}

export default Header;