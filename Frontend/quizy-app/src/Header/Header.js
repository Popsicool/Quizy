import React, { useContext, useState } from "react";
import logo from '../assets/quiz-icon.jpg';
import { UserContext } from '../App/App';
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const user = useContext(UserContext).user;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="header" width="40" className="d-inline-block ms-4" />
          <strong>Quizy App</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNavAltMarkup"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto m-4 align-items-end">
            <NavLink exact to="/" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              About
            </NavLink>
            <NavLink to="/help" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              Help
            </NavLink>
            {user ? (
              <span
                className="nav-link fs-5 text-secondary fw-bold"
                onClick={() => {
                  localStorage.removeItem("QuizyUser");
                  window.location.reload();
                }}
              >
                Log Out
              </span>
            ) : (
              <NavLink to="/login" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
                Log In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;