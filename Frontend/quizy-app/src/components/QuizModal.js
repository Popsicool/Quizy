import React from 'react';
import { Link } from 'react-router-dom';

const QuizModal = ({ grade }) => {
  let message;

  if (grade >= 90) {
    message = 'Congratulations! You are truly a genius.';
  } else if (grade >= 80) {
    message = 'Congratulations! You scored an excellent grade.';
  } else if (grade >= 70) {
    message = 'Great job! You scored a very good grade.';
  } else if (grade >= 60) {
    message = 'Well done! You scored a good grade.';
  } else {
    message = 'Keep practicing! You scored a below-average grade.';
  }

  return (
    <div className='modal-container'>
      <div className='mud'>
        <div>
          <h3>You Scored {grade} %</h3>
          <p>{message}</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;