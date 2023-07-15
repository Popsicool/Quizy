import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/quiz-icon.jpg';
import { UserContext } from '../App/App';
import { NavLink, Link } from "react-router-dom";
import './Header.css';

function Header() {
  const user = useContext(UserContext).user;
  const signOut = useContext(UserContext).signOut;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isNavOpen ? 'overlay' : ''}`}>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="header" width="40" className="d-inline-block ms-4" />
          <strong>Quizy App</strong>
        </Link>
        <button
          className="navbar-toggler me-2"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNavAltMarkup"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto m-4 align-items-end">
            <NavLink exact to="/" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              Dev Team
            </NavLink>
            <NavLink to="/help" className="nav-link fs-5 text-secondary fw-bold" activeClassName="active">
              About
            </NavLink>
            {user ? (
              <span
                className="nav-link fs-5 text-secondary fw-bold"
                onClick={() => signOut()}
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