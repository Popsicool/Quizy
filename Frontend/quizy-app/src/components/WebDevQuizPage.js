import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const QuizPages = () => {
  return (
    <>
    <HelmetProvider>
      <Helmet>
          <title>Quizy-WebDev</title>
        </Helmet>
    </HelmetProvider>
    <div>
      <h1>Welcome to Web Dev Quiz page</h1>
    </div>
    </>
  )
}

export default QuizPages