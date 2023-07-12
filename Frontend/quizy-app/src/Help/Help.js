import React from "react";
import { Helmet } from "react-helmet";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Help.css';

export default function Help() {
  return(
    <>
    <Helmet>
      <title>Quizy - Help</title>
    </Helmet>
    <Header />
    <div className="help_body">
      <div className="card-1">
        <h2>Test Your Knowledge on different topics </h2>
        <p>Quizy has different categories to test your intelligence. This ranges from Tech and Programming, to philosophy and Mathematics.</p>
      </div>
      <div className="card-2">
        <h2>Create Quizes</h2>
        <p>Create quizes and allow friends around the world test their knowledge you specify. Creating quizes puts you in the position of the tutor testing a class of friends around the world. Your quiz can also be ranked as the most popular in the </p>
      </div>
      <div className="card-3">
        <h2>Join the leaderboard</h2>
        <p>Join the leaderboard and Take quizes to be ranked among the 'Eisteins' of this generation. The leader board takes in consideration your quiz history and the points you have scored over a period of time.</p>
      </div>
    </div>
    <Footer />
    </>
  )
}