import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import QuizCategory from '../QuizCategory/QuizCategory';
import Header from '../Header/Header';

export const Home = () => {
  return (
    <>
      <div className='header'>
          <Header />
      </div>
      <div className='hero_section'>
        <HeroSection />
      </div>
      <div className='main_category'>
        <QuizCategory />
      </div>
      </>
  )
}
