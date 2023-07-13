import React from 'react';
import { Link } from 'react-router-dom';

const QuizModal = ({ grade }) => {
  return (
    <div className='modal-container'>
      <div className='mud'>
        <div>
          <h3>You Scored {grade} %</h3>
          <p>Your Score has been recorded</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;