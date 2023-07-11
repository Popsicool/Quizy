import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import QuizCategory from '../QuizCategory/QuizCategory';
import { Helmet } from 'react-helmet'

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quizzy - Home</title>
      </Helmet>
      <div className='header'>
      </div>
      <div className='hero_section'>
        <HeroSection />
      </div>
      <div className='main_category'>
        <QuizCategory />
      </div>
      <div className='footer'>
      </div>
      </>
  )
}
