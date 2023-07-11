import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export const QuizPage = () => {
    const [quiz, setQuiz] = useState([])
    const [questions, setQuestions] = useState([])
    const {id} = useParams()
    useEffect(()=>{
    const url = `https://quizy.popsicool.tech/api/v1/quiz?id=${id}`
        fetch(url)
        .then(res => {
        return res.json()
        })
        .then((data) => {
            setQuiz(data)
            setQuestions(data.questions)
        })
        }, []
    )
  return (
    <>
    {quiz && 
        <div>{quiz.title} <br/></div>
    }
    {questions && questions.map((quest) => (
        <div key={quest.id}>
            <p>
                question : {quest.question}
            </p>
            <p>Option A: {quest.A}</p>
            <p>Option B: {quest.B}</p>
            <p>Option C: {quest.C}</p>
            <p>Option D: {quest.D}</p>
            <p>Answer: {quest.answer}</p>
            <br/>
        </div>
    ))}
    </>

  )
} 
export default QuizPage

// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useParams } from 'react-router-dom'

// export const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const {id} = useParams()

//   useEffect(() => {
//     // Fetch quiz questions from the API endpoint
//     const url = `https://quizy.popsicool.tech/api/v1/quiz?id=${id}`
//     fetch(url)
//       .then(response => response.json())
//       .then(data => setQuestions(data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleNextQuestion = () => {
//     setCurrentQuestion(prevQuestion => prevQuestion + 1);
//   };

//   const handlePreviousQuestion = () => {
//     setCurrentQuestion(prevQuestion => prevQuestion - 1);
//   };

//   if (!questions.length) {
//     return <div>Loading...</div>;
//   }

//   const currentQuiz = questions[currentQuestion];

//   return (
//     <>
//       <Helmet>
//         <title>Quizy-WebDev</title>
//       </Helmet>
//       <div className="container">
//         <div className="m-4">
//           <h1>Mathematics Quiz Section</h1>
//           <hr className="border-primary" />
//         </div>

//         <div className="m-4 d-flex justify-content-between align-items-center">
//           <p>{currentQuestion + 1} of {questions.length}</p>
//           <div className="d-flex align-items-center">
//             <FontAwesomeIcon icon={faClock} />
//             <time>2:09</time>
//           </div>
//         </div>

//         <div className="container border-start border-thick border-secondary border-4">
//           <div className="m-4">
//             <p className="fw-bold m-2" style={{ color: 'grey' }}>{currentQuiz.question}</p>
//           </div>

//           <div className="container">
//             <div className="row">
//               {currentQuiz.options.map((option, index) => (
//                 <div className="col" key={index}>
//                   <button className="rounded-pill btn btn-primary btn-block m-2" style={{ width: '30rem' }}>{option}</button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="d-flex justify-content-start mt-4">
//             <button className="btn btn-outline-primary m-4" onClick={handlePreviousQuestion}>
//               <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
//               Previous
//             </button>

//             <button className="btn btn-primary m-4" onClick={handleNextQuestion}>
//               Next
//               <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
//             </button>

//             <a href="/" className="btn btn-danger m-4">
//               Quit
//               <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuizPage;