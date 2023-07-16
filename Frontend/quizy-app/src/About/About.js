import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function About() {
  return(
    <>
    <HelmetProvider>
      <Helmet>
        <title>Quizy - About</title>
      </Helmet>
    </HelmetProvider>
    <h1>Meet the developers</h1>
    </>
  )
}

export default About;