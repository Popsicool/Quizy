import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserContext } from '../App/App';
import { Loading } from '../components/Loading';
import { toast } from 'react-toastify';
import QuizQuestion from '../components/QuizQuestion';
import QuizModal from '../components/QuizModal';
import PropTypes from 'prop-types';
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
  const signOut = useContext(UserContext).signOut;

  const wrongAudioRef = useRef(null);
  const correctAudioRef = useRef(null);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState(180); // 3 minutes

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

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          submit();
        }
        return prevTimer - 1;
      });
    }, 1000); // 1 second
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    startTimer();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const next = () => {
    if (pos < questions.length - 1) {
      setCurr(questions[pos + 1]);
      setPos(pos + 1);
      resetTimer(); // Reset the timer when moving to the next question
    }
  };

  const prev = () => {
    if (pos > 0) {
      setCurr(questions[pos - 1]);
      setPos(pos - 1);
      resetTimer(); // Reset the timer when moving to the previous question
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
        signOut()
      });
  };

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>Quizy - quiz page</title>
      </Helmet>

    </HelmetProvider>

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
                    <time>{formatTime(timer)}</time>
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

                  <Link to="/" className='m-4 btn-outline-danger'>
                    Quit
                    <FontAwesomeIcon icon={faSignOutAlt} className='ms-2' />
                  </Link>
                </div>
                <audio ref={wrongAudioRef} src={wrongAudio} />
                <audio ref={correctAudioRef} src={correctAudio} />

              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

QuizModal.propTypes = {
  grade: PropTypes.number.isRequired,
};

QuizQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  mark: PropTypes.func.isRequired,
};

export default QuizPage;