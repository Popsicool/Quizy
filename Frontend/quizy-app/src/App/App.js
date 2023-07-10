
import { Home } from '../components/Home'
import { ToastContainer} from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../components/NotFound';
import { Auth } from '../AuthSection/Auth'
import { useEffect, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import WebDevQuizPage from '../../src/components/WebDevQuizPage'
import PhilosophyQuizPage from '../components/PhilosophyQuizPage';
import MathsQuizPage from '../components/MathsQuizPage';
import GetStarted from '../components/GetStarted';



function App() {

  const [user, setUser] = useState(localStorage.getItem("QuizyUser") ? JSON.parse(localStorage.getItem("QuizyUser")) : null)
  const signIn = (props) => {
    setUser(props)
  }

  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element= {<Home />}></Route>
              <Route path="/login" element= {<Auth/>}></Route>
              <Route path="*" element={<NotFound/>} />
              <Route path="/webdev-quizzes" element={<WebDevQuizPage/>} />
              <Route path="/maths-quizzes" element={<MathsQuizPage/>} />
              <Route path="/philosophy-quizzes" element={<PhilosophyQuizPage/>} />
              <Route path="/get-started" element={<GetStarted/>} />
      </Routes>

    </div>
  );
}

export default App;
