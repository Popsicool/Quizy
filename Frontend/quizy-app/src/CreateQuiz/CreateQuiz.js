import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import CategoryOption from '../components/CategoryOption';
import { UserContext } from '../App/App';
import login from '../assets/logins.jpg';
import { Link } from "react-router-dom";

const CreateQuiz = () => {
  const token = localStorage.getItem("QuizyUser");
  const [title, settitle] = useState("");
  const [category, setCategory] = useState();
  const [quizId, setQuizid] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const submitQuiz = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const quizForm = { "title": title, "category": [JSON.parse(category)], "questions": questions }



    fetch("https://quizy.popsicool.tech/api/v1/quiz", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(token).access}`,
      },
      body: JSON.stringify(quizForm)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res)
        }
        return res.json()
      })
      .then(result => {
        setIsLoading(false)
        toast.success("Login Successful", {
          position: "top-right"
        })
        setQuizid(result.id)
      })
      .catch(() => {
        setIsLoading(false)
        toast.error("Invalid Credentials", {
          position: "top-right"
        })
      });

  }

  return (
    <>
      <Helmet>
        <title>Quizy - Create quiz</title>
      </Helmet>
      <div className="row">
        <div className='col-md-6'>
          <img src={login} width='100%' height='100%' alt='img' />
        </div>
        <div className='col-md-6'>

          <div className='text-center justify-content-center p-5'>
            <h2>Create Your Quiz</h2>
            <form onSubmit={submitQuiz}>
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  type="title" required className="form-control" placeholder='Quiz title' />
              </div>

              <div className="form-outline mb-4">
                <CategoryOption selectedcategory={category} setCategory={setCategory} />
              </div>

              {quizId && <div className='form-outline mb-4'>
                <Link to={`/create-question/${quizId}`} className="btn btn-primary btn-info mb-4" >
                  Create Questions
                </Link>
              </div>}
              <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
            </form>
          </div>


        </div>
      </div>
    </>
  )
};

export default CreateQuiz;