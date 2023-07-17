import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { UserContext } from '../App/App';
import login from '../assets/images/logins.jpg'


export const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)
  // const [error, setError] = useState(null)
  const [loginEmail, setloginEmail] = useState("")
  const [loginPass, setLoginPass] = useState("")
  const [SigninName, setSigninName] = useState("")
  const [SigninPass, setSigninPas] = useState("")
  const [SigninFirstName, setSigninFirstName] = useState("")
  const [SigninLastName, setSigninLastName] = useState("")
  const [signinEmail, setSigninEmail] = useState("")
  const [isloading, setIsLoading] = useState(false)


  const navigate = useNavigate()
  const signIn = useContext(UserContext).signIn

  const submitLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const loginForm ={"email": loginEmail, "password": loginPass}
    fetch("https://quizy.popsicool.tech/api/token", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginForm)})
    .then(res => {
      if (!res.ok){
        throw Error(res)
      }
        return res.json()
    })
    .then(result => {
      setIsLoading(false)
      toast.success("Login Successful", {
        position:"top-right"})
        signIn(result)
        navigate("/", {replace: true})
    })
    .catch(() =>{
      setIsLoading(false)
      toast.error("Invalid Credentials", {
      position:"top-right"
    })
    });
  }
 const submitSignin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const signinForm = {"email": signinEmail, "username" : SigninName, "password": SigninPass, "first_name": SigninFirstName, "last_name": SigninLastName}
    fetch("https://quizy.popsicool.tech/api/v1/auth/sign_up", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(signinForm)})
    .then(res => {
      if (!res.ok){
        return res.json().then(response => {
          throw new Error(response)})
      }
        return res.json()
    })
    .then(() => {
        setIsLoading(false)
        toast.success("Account Created, login to continue", {
        position:"top-right"})
        setShowLogin(true)
    })
    .catch((err) => {
      console.error(err.message)
      setIsLoading(false)
      toast.error("Username or Email already exist", {
      position:"top-right"
    })

});
  }
  return (
    <>
      {isloading ? <Loading/> :
      <div className='row'>
        <div className='col-md-6'>
          <img src={login} width= '100%' height= '100%' alt='img'/>
        </div>
        <div className='col-md-6'>
          {showLogin ?
          <div className='text-center justify-content-center p-5'>
            <h2>Log in</h2>
            <form onSubmit={submitLogin}>
              <div className="form-outline mb-4">
                <input
                onChange={(e) => setloginEmail(e.target.value)}
                value = {loginEmail}
                type="email" required className="form-control" placeholder='Email address'/>
              </div>

              <div className="form-outline mb-4">
                <input
                onChange={(e) => setLoginPass(e.target.value)}
                value = {loginPass}
                type="password" required  className="form-control" placeholder='Password'/>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

              <div className="text-center">
                <p>Don't have an account? Click <span className='fw-bold' style={{color:'red', cursor:'pointer'}} onClick={() => setShowLogin(false)} >Here</span> to create one now</p>
              </div>
            </form>
          </div> :
          <div className='text-center justify-content-center p-5'>
            <h2>Sign Up</h2>
              <form onSubmit={submitSignin}>
                  <div className="form-outline mb-4">
                    <input
                    onChange={(e) => setSigninName(e.target.value)}
                    value = {SigninName}
                    type="text" required className="form-control" placeholder='Username'/>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                    onChange={(e) => setSigninEmail(e.target.value)}
                    value = {signinEmail}
                    type="email" required className="form-control" placeholder='email'/>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                    onChange={(e) => setSigninFirstName(e.target.value)}
                    value = {SigninFirstName}
                    type="text" required className="form-control" placeholder='First Name'/>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                    onChange={(e) => setSigninLastName(e.target.value)}
                    value = {SigninLastName}
                    type="text" required className="form-control" placeholder='Last Name'/>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                    onChange={(e) => setSigninPas(e.target.value)}
                    value = {SigninPass}
                    type="password" required className="form-control"  placeholder='Password'/>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Create Account</button>

                  <div className="text-center">
                    {/* <p>Don't have an account? <button type="button" onClick={() => setShowLogin(true)} className='btn btn-warning'>Login</button> now</p> */}
                    <p>Already have an account? Click <span className='fw-bold' style={{color:'red', cursor:'pointer'}} onClick={() => setShowLogin(true)} >Here</span> to log in</p>
                  </div>
                </form>
          </div>
          }
        </div>
      </div>
      }
    </>
    
  )
  
}
