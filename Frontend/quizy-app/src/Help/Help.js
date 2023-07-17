import React from "react";
import { Helmet } from "react-helmet";

export default function Help() {
  return (
    <>
      <Helmet>
        <title>Quizy - Help</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="fw-bold align-text-center m-4" style={{color:'red'}}>Quizy App</h1>
            <p>Quizy App is a fun and engaging web-based responsive interactive online quizzing application that allows users to create and share quizzes and challenge themselves in topics of their choice. Users with an account and are logged in can track their performance across quizzes and create quizzes for other users to take. The home page displays a set of categories with accompanying quizzes for users to choose from.</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Test Your Knowledge on Different Topics</h2>
                <p className="mt-4">Quizy offers a variety of categories to test your intelligence, ranging from Tech and Programming to Philosophy and Mathematics.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Create Quizzes</h2>
                <p className="mt-4">Create quizzes and allow friends from around the world to test their knowledge. Creating quizzes puts you in the position of a tutor, testing a class of friends worldwide. Your quiz can also be ranked as the most popular.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Join the Leaderboard</h2>
                <p className="mt-4">Join the leaderboard and take quizzes to be ranked among the "Einstein's" of this generation. The leaderboard considers your quiz history and the points you have scored over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}