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


export const Category = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setQuizzes(data);
      });
  }, []);

  return (
    <>
    <div className='container'>

      {loading ? <Loading/> : <>
      <div className='text-center fw-bold m-4' style={{color:"red"}}>
          <h1>Welcome to the {name} Quiz Category</h1>
          <hr  />
      </div>

        <div className=' fw-bold m-4'><h2 className='text-muted mt-4'>Select a quiz and get started</h2></div>
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="my-4">
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>
                  id of {quiz.id} created on {new Date(quiz.created).toString()}
                </Card.Text>
                <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">
                  Try it Out
                </Link>
              </Card.Body>
            </Card>
          ))}

      </>}

      </div>
    </>
  );
};
