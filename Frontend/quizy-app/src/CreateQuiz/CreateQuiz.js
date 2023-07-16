import React, { useState, useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import CategoryOption from '../components/CategoryOption';
import { UserContext } from '../App/App';
import login from '../assets/logins.jpg';
import './CreateQuiz.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CreateQuiz = () => {
  const user = useContext(UserContext).user;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCat, setShowCat] = useState(true);
  const navigate = useNavigate();
  const signOut = useContext(UserContext).signOut;
  let questionTemplate = {
    question: '',
    A: '',
    B: '',
    C: '',
    D: '',
    answer: '',
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...questionTemplate }]);
  };

  const handleChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const submit = (e) => {
    e.preventDefault();
    if (questions.length < 1) {
      toast.error('No question added', {
        position: 'top-right',
      });
      return;
    }
    if (title === '') {
      toast.error('Add quiz title', {
        position: 'top-right',
      });
      setShowCat(true);
      return;
    }
    if (!category) {
      toast.error('No Category selected', {
        position: 'top-right',
      });
      setShowCat(true);
      return;
    }
    for (const question of questions) {
      if (
        question.question === '' ||
        question.A === '' ||
        question.B === '' ||
        question.C === '' ||
        question.D === '' ||
        question.answer === ''
      ) {
        toast.error('Invalid question format', {
          position: 'top-right',
        });
        return;
      }
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.access}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      title,
      category: [JSON.parse(category)],
      questions,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    setIsLoading(true);
    fetch('https://quizy.popsicool.tech/api/v1/quiz', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        toast.success('Quiz created successfully', {
          position: 'top-right',
        });
        setIsLoading(false);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error('Session Expired, Login to continue', {
          position: 'top-right',
        });
        console.log(error);
        signOut();
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Quizy - Create quiz</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {showCat ? (
            <div className="row">
              <div className="col-md-6">
                <img src={login} width="100%" height="100%" alt="img" />
              </div>
              <div className="col-md-6">
                <div className="text-center justify-content-center p-5">
                  <h2>Create Your Quiz</h2>
                  <div className="mb-4">
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="title"
                      required
                      className="form-control"
                      placeholder="Quiz title"
                    />
                  </div>
                  <div className="mb-4">
                    <CategoryOption
                      selectedcategory={category}
                      setCategory={setCategory}
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block mb-4"
                    onClick={() => setShowCat(false)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <form onSubmit={submit}>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <textarea
                      type="text"
                      className="form-control mb-2"
                      placeholder="Question"
                      value={question.question}
                      onChange={(e) =>
                        handleChange(index, 'question', e.target.value)
                      }
                    />
                    {Object.keys(question).map((k, idx) => {
                      if (
                        k !== 'question' &&
                        k !== 'quiz' &&
                        k !== 'answer'
                      ) {
                        return (
                          <textarea
                            key={idx}
                            className="form-control mb-2"
                            type="text"
                            placeholder={`Option ${k}`}
                            value={question[k]}
                            onChange={(e) =>
                              handleChange(index, k, e.target.value)
                            }
                          />
                        );
                      } else if (k === 'answer') {
                        return (
                          <select
                            key={idx}
                            className="form-control mb-2"
                            value={question[k]}
                            onChange={(e) =>
                              handleChange(index, k, e.target.value)
                            }
                          >
                            <option value="">Select an Answer</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  onClick={() => setShowCat(true)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary m-2 "
                  onClick={handleAddQuestion}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 " /> Add New Question
                </button>
                <button
                  type="submit"
                  className="btn btn-success m-2"
                  disabled={questions.length < 1 || title === '' || !category}
                
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreateQuiz;