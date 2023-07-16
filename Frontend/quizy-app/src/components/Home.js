import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import QuizCategory from '../QuizCategory/QuizCategory';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const Home = () => {
  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>Quizzy - Home</title>
      </Helmet>
    </HelmetProvider>


      <div className='hero_section'>
        <HeroSection />
      </div>
      <div className='main_category'>
        <QuizCategory />
      </div>

    </>
  )
}
