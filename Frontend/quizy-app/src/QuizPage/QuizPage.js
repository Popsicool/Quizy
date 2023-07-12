import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
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
        }, [id] 
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
        const gt = Math.floor((sum / questions.length) * 100)
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.access}`);
        myHeaders.append("Content-Type", "application/json");
        const data = {"id": id, "score": gt}
        var raw = JSON.stringify(data);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };
        const url = "https://quizy.popsicool.tech/api/v1/submit"
        fetch(url, requestOptions)
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
            console.log(error)
            localStorage.removeItem("QuizyUser")
            window.location.reload()
        });
    }
    
  return (
    <>
    <Helmet>
        <title>Quizy - quiz page</title>
      </Helmet>
      
        {loading ? <Loading/> :
            <>
                <div className="container">

                    {modal ? <div className='modal-container'>
                    <div className='mud'>
                        <div>
                            <h3>You Scored {grade} %</h3>
                            <p>Your Score has been recorded</p>
                            <Link to="/">Go Home</Link>
                        </div>
                    </div>
                </div> :
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
                                            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("A")} style={{ width: '100%' }}>{curr.A}</button>
                                        </div>
                                        <div className="col">
                                            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("B")} style={{ width: '100%' }}>{curr.B}</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("C")} style={{ width: '100%' }}>{curr.C}</button>
                                        </div>
                                        <div className="col">
                                            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("D")} style={{ width: '100%' }}>{curr.D}</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-start  mt-4'>
                                    <button className='m-4 btn-outline-success' onClick={() => prev()}>
                                        <FontAwesomeIcon icon={faArrowLeft} className='me-2' />
                                        Previous
                                    </button>
                                    {pos !== questions.length - 1 ?
                                        <button className='m-4 btn-outline-success' onClick={() => next()}>
                                            Next
                                            <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                                        </button>
                                        :
                                        <button className='m-4' onClick={() => submit()}>
                                            Submit
                                        </button>
                                }

                                    <a href="/" className='m-4 btn-outline-danger'>
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