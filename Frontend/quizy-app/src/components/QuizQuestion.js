import React from 'react';

const QuizQuestion = ({ question, mark }) => {
  return (
    <div className='container border-start border-thick border-secondary border-4'>
      <div className='m-4'>
        <p className="fw-bold m-2" style={{ color: 'grey' }}>{question.question}</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <button 
            className="rounded-pill btn btn-primary btn-block m-2" 
            onClick={() => mark("A")} style={{ width: '100%' }}>{question.A}
            </button>
          </div>
          <div className="col">
            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("B")} style={{ width: '100%' }}>{question.B}</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("C")} style={{ width: '100%' }}>{question.C}</button>
          </div>
          <div className="col">
            <button className="rounded-pill btn btn-primary btn-block m-2" onClick={() => mark("D")} style={{ width: '100%' }}>{question.D}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;