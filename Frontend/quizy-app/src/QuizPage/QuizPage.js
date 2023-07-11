import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom"
import { Loading } from '../components/Loading';
import { UserContext } from '../App/App';
import { toast } from 'react-toastify';
import "./quiz.css"



export const QuizPage = () => {
    const [quiz, setQuiz] = useState([])
    const [questions, setQuestions] = useState([])
    const [curr, setCurr] = useState([])
    const {id} = useParams()
    const [score, setScore ] = useState()
    const [grade, setGrade] = useState(null)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const user = useContext(UserContext).user

    useEffect(()=>{
    const url = `https://quizy.popsicool.tech/api/v1/quiz?id=${id}`
        fetch(url)
        .then(res => {
        return res.json()
        })
        .then((data) => {
            setQuiz(data)
            setQuestions(data.questions)
            setLoading(false)
            if (data.questions.length > 0){
                setCurr(data.questions[0])
                setScore(Array.apply(null, Array(data.questions.length)).map(() => 0))
            }
        })
        }, []
    )
    const [pos, setPos] = useState(0)
    const next = () => {
        if (pos < questions.length - 1){
            setCurr(questions[pos + 1])
            setPos(pos + 1)
        }
    }
    const prev = () => {
        if (pos > 0){
            setCurr(questions[pos - 1])
            setPos(pos - 1)
        }
    }
    const mark = (prop) => {
        if (curr.answer === prop){
            setScore(score => {
                return [
                        ...score.slice(0, pos),
                        score[pos] = 1,
                        ...score.slice(pos + 1),
                    ]
            })
        }
        else{
            setScore(score => {
                return [
                        ...score.slice(0, pos),
                        score[pos] = 0,
                        ...score.slice(pos + 1),
                    ]
            })
        }
        next()
    }
    const submit = () => {
        let sum = 0;
        for (let i = 0; i < score.length; i++) {
            sum += score[i];
        }
        setGrade(Math.floor((sum / questions.length) * 100))
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.access}`);
        myHeaders.append("Content-Type", "application/json");
        const data = {"id": id, "score": grade}
        var raw = JSON.stringify(data);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };

        fetch("https://quizy.popsicool.tech/api/v1/submit", requestOptions)
        .then(res => {
            if (!res.ok){
                return res.json().then(response => {
                    console.log(response)
                throw new Error(response)})
            }
                return res.json()
            })
        .then(result => {
            setLoading(false)
            setModal(true)
        })
        .catch(error => {
            setLoading(false)
            toast.error("Session Expired, Login to continue", {
            position:"top-right"
            })
            localStorage.removeItem("QuizyUser")
            navigate("login", {replace: true})
        });
    }
  return (
    <>
        {loading ? <Loading/> :
            <>
            <div className="container">

                {modal ? <div className='modal-container'>
                <div className='mud'>
                    <div>
                        <h3>You Scored {grade}</h3>
                        <p>Your Score has been recorded</p>
                        <Link to="/">Go Home</Link>
                    </div>
                </div>
            </div>:
                    <>
                        <div className='m-4 '>
                            {quiz &&
                                <h1>{quiz.title}</h1>
                            }
                            <hr className='border-primary' />
                        </div>

                        <div className='m-4 d-flex justify-content-between align-items-center'>
                            <p>{pos + 1} of {questions.length}</p>
                            <div className='d-flex align-items-center'>
                                <FontAwesomeIcon icon={faClock} />
                                <time>2:09</time>
                            </div>
                        </div>
                        {curr &&
                        <div className='container border-start border-thick border-secondary border-4'>
                            <div className='m-4'>
                                <p className="fw-bold m-2" style={{ color: 'grey' }}>{curr.question}</p>
                            </div>

                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("A")} style={{ width: '30rem' }}>{curr.A}</button>
                                    </div>
                                    <div className="col">
                                        <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("B")} style={{ width: '30rem' }}>{curr.B}</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("C")} style={{ width: '30rem' }}>{curr.C}</button>
                                    </div>
                                    <div className="col">
                                        <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("D")} style={{ width: '30rem' }}>{curr.D}</button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-start  mt-4'>
                                <button className='m-4' onClick={() => prev()}>
                                    <FontAwesomeIcon icon={faArrowLeft} className='me-2' />
                                    Previous
                                </button>
                                {pos !== questions.length - 1 ?
                                    <button className='m-4' onClick={() => next()}>
                                        Next
                                        <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                                    </button>
                                    :
                                    <button className='m-4' onClick={() => submit()}>
                                        Submit
                                    </button>
                            }

                                <a href="/" className='m-4'>
                                    Quit
                                    <FontAwesomeIcon icon={faSignOutAlt} className='ms-2' />
                                </a>

                            </div>
                        </div>
                        }
                        </>
                    }
                </div>
            </>

        }
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