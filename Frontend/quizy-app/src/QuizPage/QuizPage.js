import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { UserContext } from '../App/App';
import { Loading } from '../components/Loading';
import { toast } from 'react-toastify';
import QuizQuestion from '../components/QuizQuestion';
import QuizModal from '../components/QuizModal';
import "./quiz.css";
import wrongAudio from '../assets/audio/wrong-answer.mp3';
import correctAudio from '../assets/audio/correct-answer.mp3';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [curr, setCurr] = useState([]);
  const { id } = useParams();
  const [score, setScore] = useState([]);
  const [grade, setGrade] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext).user;

  const wrongAudioRef = useRef(null);
  const correctAudioRef = useRef(null);

  useEffect(() => {
    const url = `https://quizy.popsicool.tech/api/v1/quiz?id=${id}`;
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        setQuiz(data);
        setQuestions(data.questions);
        setLoading(false);
        if (data.questions.length > 0) {
          setCurr(data.questions[0]);
          setScore(Array(data.questions.length).fill(0));
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const [pos, setPos] = useState(0);
  const [playWrongAudio, setPlayWrongAudio] = useState(false);
  const [playCorrectAudio, setPlayCorrectAudio] = useState(false);

  useEffect(() => {
    if (wrongAudioRef.current) {
      wrongAudioRef.current.src = wrongAudio;
    }
    if (correctAudioRef.current) {
      correctAudioRef.current.src = correctAudio;
    }
  }, []);

  useEffect(() => {
    if (playWrongAudio) {
      wrongAudioRef.current.play();
      setPlayWrongAudio(false);
    }
  }, [playWrongAudio]);

  useEffect(() => {
    if (playCorrectAudio) {
      correctAudioRef.current.play();
      setPlayCorrectAudio(false);
    }
  }, [playCorrectAudio]);

  const next = () => {
    if (pos < questions.length - 1) {
      setCurr(questions[pos + 1]);
      setPos(pos + 1);
    }
  };

  const prev = () => {
    if (pos > 0) {
      setCurr(questions[pos - 1]);
      setPos(pos - 1);
    }
  };

  const mark = (prop) => {
    const isCorrect = curr.answer === prop;

    if (isCorrect) {
      setPlayCorrectAudio(true);
      toast.success('Correct answer!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPlayWrongAudio(true);
      toast.error('Wrong answer!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    setScore(prevScore => {
      const updatedScore = [...prevScore];
      updatedScore[pos] = isCorrect ? 1 : 0;
      return updatedScore;
    });
    next();
  };

  const submit = () => {
    const sum = score.reduce((total, current) => total + current, 0);
    const gt = Math.floor((sum / questions.length) * 100);
    setGrade(gt);
    setLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, score: gt })
    };

    const url = "https://quizy.popsicool.tech/api/v1/submit";
    fetch(url, requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Submission failed');
        }
        return res.json();
      })
      .then(result => {
        setLoading(false);
        setModal(true);
      })
      .catch(error => {
        setLoading(false);
        toast.error("Session Expired, Login to continue", {
          position: "top-right"
        });
        console.log(error);
        localStorage.removeItem("QuizyUser");
        window.location.reload();
      });
  };

  return (
    <>
      <Helmet>
        <title>Quizy - quiz page</title>
      </Helmet>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            {modal ? (
              <QuizModal grade={grade} />
            ) : (
              <>
                <div className='m-4 '>
                  {quiz && <h1>{quiz.title}</h1>}
                  <hr className='border-primary' />
                </div>

                <div className='m-4 d-flex justify-content-between align-items-center'>
                  <p>{pos + 1} of {questions.length}</p>
                  <div className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faClock} />
                    <time>2:09</time>
                  </div>
                </div>

                {curr && <QuizQuestion question={curr} mark={mark} />}

                <div className='d-flex justify-content-start  mt-4'>
                  <button className='m-4 btn-outline-success' onClick={prev}>
                    <FontAwesomeIcon icon={faArrowLeft} className='me-2' />
                    Previous
                  </button>
                  {pos !== questions.length - 1 ? (
                    <button className='m-4 btn-outline-success' onClick={next}>
                      Next
                      <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                    </button>
                  ) : (
                    <button className='m-4' onClick={submit}>
                      Submit
                    </button>
                  )}

                  <a href="/" className='m-4 btn-outline-danger'>
                    Quit
                    <FontAwesomeIcon icon={faSignOutAlt} className='ms-2' />
                  </a>
                </div>
                <audio ref={wrongAudioRef}  />
                <audio ref={correctAudioRef} />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default QuizPage;