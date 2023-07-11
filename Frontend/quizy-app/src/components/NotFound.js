import React from 'react'
import { NavLink, useRouteError } from 'react-router-dom'

export const NotFound = () => {
    const error = useRouteError();
    console.error(error);
  return (
    <>
    <div class="page-wrap d-flex flex-row align-items-center m-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <h1>{error.statusText}</h1>
                <p>Sorry an unexpected error occured</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <NavLink to="/">Home</NavLink>
            </div>
        </div>
    </div>
</div>
        </>
  )
}
