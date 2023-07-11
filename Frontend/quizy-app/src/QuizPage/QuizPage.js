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
