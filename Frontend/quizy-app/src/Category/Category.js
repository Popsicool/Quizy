import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Category = () => {
    const [quizzes, setQuizzes] = useState([])
    const {name} = useParams()
    useEffect(()=>{
    const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${name}`
        fetch(url)
        .then(res => {
        return res.json()
        })
        .then((data) => {
            setQuizzes(data)
        })
        }, []
    )
  return (
    <>
    <div>Select a quiz from the {name} Category</div>
    {quizzes && quizzes.map((quiz) => (
        <div key={quiz.id}>
            id of {quiz.id}
            {quiz.title} created on {new Date(quiz.created).toString()}
            <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">Try it Out</Link>
        </div>

    ))
    }
    </>
  )
}
