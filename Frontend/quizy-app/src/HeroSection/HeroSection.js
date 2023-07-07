import React from 'react';
import '../HeroSection/HeroSection.css'

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-image"></div>
      <div className="hero-content">
        <h1>Welcome to the Quiz App</h1>
        <p>Test your knowledge with our fun quizzes</p>
        <button className="start-button">Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;

  