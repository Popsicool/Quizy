import React from 'react'
import categoryImg from '../assets/landing-page.jpg'
import categoryImg1 from '../assets/sign-in.jpg'
import categoryImg2 from '../assets/log-in.jpg'
import './QuizCategory.css'

const QuizCategory = () => {
  return (
    <>
    <div className='categories-container mt-4'>
    <div className='section-title'>
    <h2>Quiz Category</h2>
    </div>
    <div className='section-tagline'>
    <p>Choose your prefered category and get started</p>
    </div>
    </div>
    <div className=' row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
      <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg2} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Mathematics</h5>
          <p className="card-text">Are you a Maths guru? Check out how good you truly are...</p>
          <a href="/" className="btn btn-primary">Free Quizzes</a>
        </div>
      </div>
      <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg1} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Web Development</h5>
          <p className="card-text">Test your knowledge in Web development.</p>
          <a href="/" className="btn btn-primary">Try it Out</a>
        </div>
      </div>
      <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Philosophy</h5>
          <p className="card-text">Test your knowledge of Philosoph</p>
          <a href="/" className="btn btn-primary">Let's go there</a>
        </div>
      </div>
    </div>
    </>
  )
}

export default QuizCategory
