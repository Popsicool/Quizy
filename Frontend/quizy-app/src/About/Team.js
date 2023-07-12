import React from 'react'
import { Helmet } from "react-helmet";
import pop from "../assets/teams/pop.jpg"
import Ben from "../assets/teams/Bennet.jpg"
import "./team.css"

export const Team = () => {
  const team = [
    {
      "name" : "AKINOLA SAMSON",
      "title" : "Software Engineer",
      "text" : "An experienced Fullstack software enginner with many software skills in his arsenal, A certified Animal scientist",
      "image": pop,
      "fb": "mailto:akinolasamson1234@gmail.com",
      "ln": "https://www.linkedin.com/in/akinola-samson-438458124",
      "tw": "https://twitter.com/Samson_Akinola1",
      "wa": "https://wa.me/+2348069482021"
    },
    {
      "name" : "BENNET UKOH",
      "title" : "Software Engineer",
      "text" : "Frontend software enginner with focus on React.js | UI/UX Enthusiast",
      "image": Ben,
      "fb": "https://web.facebook.com/Ukoh.Bennet/",
      "ln": "https://www.linkedin.com/in/ukohbennet/",
      "tw": "https://twitter.com/ukoh_bennet",
      "wa": "https://wa.me/+2347036960106"
    },
    {
      "name" : "BIRHANE GULILAT",
      "title" : "Software Engineer",
      "text" : "An experienced Fullstack software enginner with many software skills in his arsenal, A certified Animal scientist",
      "image": "./images/teams/pop.jpg",
      "fb": "mailto:akinolasamson1234@gmail.com",
      "ln": "https://www.linkedin.com/in/akinola-samson-438458124",
      "tw": "https://twitter.com/Samson_Akinola1",
      "wa": "https://wa.me/+2348069482021"
    },
    {
      "name" : "EMMANUEL UGIH",
      "title" : "Software Engineer",
      "text" : "An experienced Fullstack software enginner with many software skills in his arsenal, A certified Animal scientist",
      "image": "./images/teams/pop.jpg",
      "fb": "mailto:akinolasamson1234@gmail.com",
      "ln": "https://www.linkedin.com/in/akinola-samson-438458124",
      "tw": "https://twitter.com/Samson_Akinola1",
      "wa": "https://wa.me/+2348069482021"
    }
  ]
  return (
    <>
      <Helmet>
        <title>Quizy - About</title>
      </Helmet>
    <section className="main-Team">
      <div className='container'>
        <h1 className="text-center oA m-4"><b>MEET THE DEVELOPERS</b></h1>
			  <br/><br/>
        <div className='row'>
          {team.map((staff) => (
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={staff.name}>
              <div className="profile-card bg-white shadow mb-4 text-center rounded-lg p-4 position-relative h-100">
                 <div className="profile-card_image">
                  <img src={staff.image} alt="User" className="mb-4 shadow" width={250} height={250}/>
                </div>
                <div className="profile-card_details">
                  <h3 className="mb-0 text-dark">{staff.name}</h3>
                  <p className="text-muted">{staff.title}</p>
                  <p className="text-muted">{staff.text}</p>
                </div>
                <div className="social-icons small profile-card_social text-center p-4">
													<a href={staff.tw} target="_blank" className="rectangle"
														rel="noopener noreferrer"
                            ><i className="fa fa-twitter"></i
													></a>
													<a href={staff.ln} target="_blank"
														rel="noopener noreferrer"
                            ><i className="fa fa-linkedin"></i
													></a>
													<a href={staff.ml} target="_blank" className="rectangle"
														rel="noopener noreferrer"
                            ><i className="fa fa-envelope"></i
													></a>
                          <a href={staff.wa} target="_blank" className="rectangle"
														rel="noopener noreferrer"
                            ><i className="fa fa-whatsapp"></i
													></a>
												</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  </>
  )
}
