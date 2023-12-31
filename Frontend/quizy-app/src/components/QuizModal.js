import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const QuizModal = ({ grade }) => {
  let message;

  if (grade >= 90) {
    message = (
      <>
        <FontAwesomeIcon icon={faTrophy} /> Congrats! You are truly a genius.
      </>
    );
  } else if (grade >= 80) {
    message = (
      <>
        Congratulations! <br />
        You scored an excellent grade.
      </>
    );
  } else if (grade >= 70) {
    message = (
      <>
        Great job! <br />
        You scored a very good grade.
      </>
    );
  } else if (grade >= 60) {
    message = (
      <>
        Well done! <br />
        You scored a good grade.
      </>
    );
  } else {
    message = (
      <>
        Keep practicing! <br />
        You scored a below-average grade.
      </>
    );
  }

  return (
    <div className='modal-container'>
    <div className='mud'>
      <div className="text-center">
        <h3 className='fw-bold scores'>You Scored - {grade}%</h3>
        <p className="mb-4 message">{message}</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  </div>
  )  
};

export default QuizModal;