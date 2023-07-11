import React, {useEffect, useState} from 'react'
import categoryImg from '../assets/landing-page.jpg'
import categoryImg1 from '../assets/sign-in.jpg'
import categoryImg2 from '../assets/log-in.jpg'
import categoryImg3 from '../assets/maths.jpg'
import categoryImg4 from '../assets/science.jpg'
import './QuizCategory.css'
import { Link } from 'react-router-dom'

const QuizCategory = () => {
  const [categories, setCategories] = useState([])
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4]
  useEffect(()=>{
    const url = "https://quizy.popsicool.tech/api/v1/category"

    // pass second arg to fetch for the sake of abort controller
        fetch(url)
        .then(res => {
        return res.json()
        })
        .then((data) => {
            setCategories(data)
        })
        //clean up
    }, []
)

  return (
    <>
    <div className='categories-container mt-4'>
    <div className='section-title'>
    <h2>Popular Quiz Categories</h2>
    </div>
    <div className='section-tagline'>
    <p>Choose your prefered category and get started</p>
    </div>
    </div>
    <div className=' row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
      {/* <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg2} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Mathematics</h5>
          <p className="card-text">Are you a Maths guru? Check out how good you truly are...</p>
          <Link to="/maths-quizzes" className="btn btn-primary">Free Quizzes</Link>
        </div>
      </div>
      <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg1} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Web Development</h5>
          <p className="card-text">Test your knowledge in Web development.</p>
          <Link to="/webdev-quizzes" className="btn btn-primary">Try it Out</Link>
        </div>
      </div>
      <div className="card m-2" style={{ width: '20rem' }}>
        <img src={categoryImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Philosophy</h5>
          <p className="card-text">Test your knowledge of Philosophy and see how far you can go.</p>
          <Link to="/philosophy-quizzes" className="btn btn-primary">Try it Out</Link>
        </div>
      </div> */}
      {categories && categories.map((cat) => (
        <div className="card m-2" style={{ width: '20rem' }} key= {cat.id}>
          <img src={catImages[Math.floor(Math.random() * catImages.length)]} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{cat.name}</h5>
            <p className="card-text">Test your knowledge in {cat.name}.</p>
            <Link to={`/category/${cat.name}`} className="btn btn-primary">Try it Out</Link>
          </div>
        </div>

      ))
      }
    </div>
    </>
  )
}

export default QuizCategory
