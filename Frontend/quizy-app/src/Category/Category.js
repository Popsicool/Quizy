// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'

// export const Category = () => {
//     const [quizzes, setQuizzes] = useState([])
//     const {name} = useParams()
//     useEffect(()=>{
//     const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${name}`
//         fetch(url)
//         .then(res => {
//         return res.json()
//         })
//         .then((data) => {
//             setQuizzes(data)
//         })
//         }, []
//     )
//   return (
//     <>
//     <div>Select a quiz from the {name} Category</div>
//     {quizzes && quizzes.map((quiz) => (
//         <div key={quiz.id}>
//             id of {quiz.id}
//             {quiz.title} created on {new Date(quiz.created).toString()}
//             <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">Try it Out</Link>
//         </div>

//     ))
//     }
//     </>
//   )
// }
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Loading } from '../components/Loading';
import categoryImg from '../assets/landing-page.jpg';
import categoryImg1 from '../assets/hero-section.jpg';
import categoryImg2 from '../assets/log-in.jpg';
import categoryImg3 from '../assets/maths.jpg';
import categoryImg4 from '../assets/philosophy.jpg';
import categoryImg5 from '../assets/science.jpg';



export const Category = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(true)
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5];

  useEffect(() => {
    const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setQuizzes(data);
      });
  }, []);
 // Shuffle the catImages array
 const shuffledCatImages = [...catImages].sort(() => Math.random() - 0.5);

  return (
    <>
    <div className='container'>

      {loading ? <Loading/> : <>
      <div className='text-center fw-bold m-4' style={{color:"red"}}>
          <h1>Welcome to the {name} Quiz Category</h1>
          <hr  />
      </div>
      {/* <div className='row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
        {categories && categories.map((cat) => (
          <Link to={`/category/${cat.name}`} key={cat.id} className="card m-2" style={{ width: '20rem' }}>
            <img src={catImages[Math.floor(Math.random() * catImages.length)]} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{cat.name}</h5>
              <p className="card-text">Test your knowledge in {cat.name}.</p>
            </div>
          </Link>
        ))}
      </div> */}

      <div className=' fw-bold m-4'><h2 className='text-muted mt-4 text-center'>Select a quiz and get started</h2></div>
        <div className='row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
          {quizzes.map((quiz, index) => (
         
            <Link to={`/quiz/${quiz.id}`} key={quiz.id} className="card m-2" style={{ width: '20rem' }}>
            <img src={shuffledCatImages[index % shuffledCatImages.length]} className="card-img-top" alt="..." />
              <div className='card-body'>
                <div className='card-title '>{name} Quiz</div>
                <div className='card-text'>
                  Category Created on {new Date(quiz.created).toString()}
                </div>
                  
              </div>
              
            </Link>
          ))}
      </div>
      </>}

      </div>
    </>
  );
};
