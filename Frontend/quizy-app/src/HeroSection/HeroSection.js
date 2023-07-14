import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className='hero-content'>
        <h1>Welcome to Quizy App</h1>
        <p>Have fun with interesting Quizzes</p>
        <Link to={"/login"} className="btn btn-primary btn-lg">Get Started</Link>
      </div>
    </div>
  );
};

export default HeroSection;