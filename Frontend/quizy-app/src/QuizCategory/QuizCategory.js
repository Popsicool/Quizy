import React, { useEffect, useState } from 'react';
import categoryImg from '../assets/landing-page.jpg';
import categoryImg1 from '../assets/hero-section.jpg';
import categoryImg2 from '../assets/log-in.jpg';
import categoryImg3 from '../assets/maths.jpg';
import categoryImg4 from '../assets/philosophy.jpg';
import categoryImg5 from '../assets/science.jpg';
import './QuizCategory.css';
import { Link } from 'react-router-dom';

const QuizCategory = () => {
  const [categories, setCategories] = useState([]);
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5];

  useEffect(() => {
    const url = "https://quizy.popsicool.tech/api/v1/category";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Shuffle the catImages array
  const shuffledCatImages = [...catImages].sort(() => Math.random() - 0.5);

  return (
    <>
      <div className='categories-container mt-4'>
        <div className='section-title'>
          <h2>Popular Quiz Categories</h2>
        </div>
        <div className='section-tagline'>
          <p>Choose your preferred category and get started</p>
        </div>
      </div>
      <div className='row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
        {categories && categories.map((cat, index) => (
          <Link to={`/category/${cat.name}`} key={cat.id} className="card m-2" style={{ width: '20rem' }}>
            <img src={shuffledCatImages[index % shuffledCatImages.length]} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{cat.name}</h5>
              <p className="card-text">Test your knowledge in {cat.name}.</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default QuizCategory;