import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="jumbotron hero-section animate__animated animate__fadeIn">
      <div className='hero-content'>
      <h1 className="display-4">Welcome to Quizy App</h1>
      <p className="lead">Have fun with interesting Quizzes</p>
      <button className="btn btn-primary btn-lg">Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;


  