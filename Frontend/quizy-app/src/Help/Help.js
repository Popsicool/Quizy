import React from "react";
import { Helmet } from "react-helmet";
import './Help.css';

export default function Help() {
  return (
    <>
      <Helmet>
        <title>Quizy - Help</title>
      </Helmet>
      <div className="container">

        <div className="row m-4">

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Test Your Knowledge on Different Topics</h2>
                <p className="mt-4 ">Quizy has different categories to test your intelligence. This ranges from Tech and Programming to philosophy and Mathematics.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Create Quizzes</h2>
                <p className="mt-4 ">Create quizzes and allow friends around the world to test their knowledge. Creating quizzes puts you in the position of the tutor testing a class of friends around the world. Your quiz can also be ranked as the most popular.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Join the Leaderboard</h2>
                <p className="mt-4 ">Join the leaderboard and take quizzes to be ranked among the 'Einstein's of this generation. The leaderboard takes into consideration your quiz history and the points you have scored over a period of time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}