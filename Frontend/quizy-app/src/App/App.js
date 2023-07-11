import { Home } from '../components/Home';
import { ToastContainer} from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import {Team} from '../About/Team'
import Help from '../Help/Help';
import { NotFound } from '../components/NotFound';
import { Auth } from '../AuthSection/Auth'
import { useEffect, useState } from 'react';
import { createContext } from "react";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import WebDevQuizPage from '../../src/components/WebDevQuizPage'
import PhilosophyQuizPage from '../components/PhilosophyQuizPage';
import MathsQuizPage from '../components/MathsQuizPage';
import GetStarted from '../components/GetStarted';
import { RequireAuth } from '../AuthSection/RequireAuth';
import { NotAuth } from '../AuthSection/NotAuth';
import { Category } from '../Category/Category';
import { QuizPage } from '../QuizPage/QuizPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState(localStorage.getItem("QuizyUser") ? JSON.parse(localStorage.getItem("QuizyUser")) : null);
  const signIn = (props) => {
    localStorage.setItem("QuizyUser", JSON.stringify(props))
    setUser(props)
  }

  return (
    <>
    <div className="App">
      <UserContext.Provider value={{signIn, user}}>
        <ToastContainer/>
        <Header/>
        <Routes>
          <Route path="/" exact element= {<Home />} />
          <Route path="/login" element= {<NotAuth> <Auth/> </NotAuth>} />
          <Route path='/about' element={<Team />} />
          <Route path='/help' element={<Help />} />
          <Route path="/webdev-quizzes" element={<WebDevQuizPage/>} />
          <Route path="/maths-quizzes" element={<MathsQuizPage/>} />
          <Route path="/philosophy-quizzes" element={<PhilosophyQuizPage/>} />
          <Route path="/get-started" element={<GetStarted/>} />
          <Route path="/category/:name" element={<Category/>} />
          <Route path="/quiz/:id" element={<RequireAuth><QuizPage/></RequireAuth>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
      <Footer/>
    </div>
    </>
  );
}

export default App;