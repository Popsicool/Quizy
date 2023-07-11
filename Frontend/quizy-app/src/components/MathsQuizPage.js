import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MathsQuizPage = () => {
    return (
        <>
            <Helmet>
                <title>Quizy-WebDev</title>
            </Helmet>
            <div className="container">
                <div className='m-4 '>
                    <h1>Mathematics Quiz Section</h1>
                    <hr className='border-primary' />
                </div>

                <div className='m-4 d-flex justify-content-between align-items-center'>
                    <p>1 of 10</p>
                    <div className='d-flex align-items-center'>
                        <FontAwesomeIcon icon={faClock} />
                        <time>2:09</time>
                    </div>
                </div>

                <div className='container border-start border-thick border-secondary border-4'>
                    <div className='m-4'>
                        <p className="fw-bold m-2" style={{ color: 'grey' }}>What is the capital of France?</p>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button className="rounded-pill btn btn-primary btn-block m-2" style={{ width: '30rem' }}>Option 1</button>
                            </div>
                            <div className="col">
                                <button className="rounded-pill btn btn-primary btn-block m-2" style={{ width: '30rem' }}>Option 2</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="rounded-pill btn btn-primary btn-block m-2" style={{ width: '30rem' }}>Option 3</button>
                            </div>
                            <div className="col">
                                <button className="rounded-pill btn btn-primary btn-block m-2" style={{ width: '30rem' }}>Option 4</button>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-start  mt-4'>
                        <a href="/" className='m-4'>
                            <FontAwesomeIcon icon={faArrowLeft} className='me-2' />
                            Previous
                        </a>

                        <a href="/" className='m-4' >
                            Next
                            <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
                        </a>

                        <a href="/" className='m-4'>
                            Quit
                            <FontAwesomeIcon icon={faSignOutAlt} className='ms-2' />
                        </a>

                    </div>
                </div>
            </div>
        </>
    );
}

export default MathsQuizPage;