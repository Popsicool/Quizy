import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export const QuizPage = () => {
    const [questions, setQuestions] = useState([])
    const {id} = useParams()
    useEffect(()=>{
    const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${id}`
        fetch(url)
        .then(res => {
        return res.json()
        })
        .then((data) => {
            setQuestions(data)
        })
        }, []
    )
  return (
    <div>QuizPage</div>
  )
}
