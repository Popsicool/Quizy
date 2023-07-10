import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="jumbotron hero-section animate__animated animate__fadeIn">
      <div className='hero-content'>
      <h1 className="display-4">Welcome to Quizy App</h1>
      <p className="lead">Have fun with interesting Quizzes</p>
      <Link to={"/get-started" } className="btn btn-primary btn-lg">Get Started</Link>
      </div>
    </div>
  );
};

export default HeroSection;