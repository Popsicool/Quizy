import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import CategoryOption from '../components/CategoryOption';
import { UserContext } from '../App/App';
import login from '../assets/logins.jpg';
import { Link } from "react-router-dom";

const CreateQuestion = () => {
  const token = localStorage.getItem("QuizyUser");
  const { id } = useParams();
  let questionTemplate = { "question": "", "A": "", "B": "", "C": "", "D": "", "answer": "" };
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([questionTemplate]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...questionTemplate }]);
  };

  const handleChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const submitQuestions = (e) => {
    e.preventDefault()

    fetch(`https://quizy.popsicool.tech/api/v1/quiz?id=${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(token).access}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res)
        }
        return res.json()
      })
      .then(result => {
        result.questions = questions;
        fetch(`https://quizy.popsicool.tech/api/v1/quiz?id=${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(token).access}`,
          },
          body: JSON.stringify(result)
        })
          .then(res => {
            if (!res.ok) {
              throw Error(res)
            }
            return res.json()
          })
          .then(result => {
            toast.success("Login Successful", {
              position: "top-right"
            })
          })
          .catch(() => {
            toast.error("Invalid Credentials", {
              position: "top-right"
            })
          });
      });
    // console.log(questions);
  }

  return (
    <>
      <Helmet>
        Quizy - Create question
      </Helmet>

      <div className='container'>
        <form onSubmit={submitQuestions}>
          {questions.map((question, index) => (
            <div key={index}>
              <input
                type="text"
                className='form-control'
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleChange(index, 'question', e.target.value)}
              />
              {Object.keys(question).map((key) => {
                if (key !== 'question' && key !== 'quiz' && key !== 'answer') {
                  return (
                    <input
                      key={key}
                      className='form-control'
                      type='text'
                      placeholder={`Option ${key}`}
                      value={question[key]}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                    />
                  );
                }
                else if (key === 'answer') {
                  return (
                    <select value={question.key} onChange={(e) => handleChange(index, key, e.target.value)}>
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
          <button onClick={handleAddQuestion}>Add New Question</button>
          <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
        </form>
      </div>
    </>);
}

export default CreateQuestion;