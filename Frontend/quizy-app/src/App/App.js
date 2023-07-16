import { Home } from '../components/Home';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { Team } from '../About/Team'
import Help from '../Help/Help';
import { NotFound } from '../components/NotFound';
import { Auth } from '../AuthSection/Auth'
import { useState } from 'react';
import { createContext } from "react";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth } from '../AuthSection/RequireAuth';
import { NotAuth } from '../AuthSection/NotAuth';
import { Category } from '../Category/Category';
import QuizPage from '../QuizPage/QuizPage';
import CreateQuiz from '../CreateQuiz/CreateQuiz'
import Header from '../Header/Header';
import Layout from '../components/Layout';

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState(localStorage.getItem("QuizyUser") ? JSON.parse(localStorage.getItem("QuizyUser")) : null);
  const signIn = (props) => {
    localStorage.setItem("QuizyUser", JSON.stringify(props))
    setUser(props)
  }
  const signOut = () => {
    localStorage.removeItem("QuizyUser");
    setUser(null)
  }

  return (
    <Layout>
      <div className="App">
        <UserContext.Provider value={{ signIn, user, signOut }}>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" exact = "true" element={<Home />} />
            <Route path="/login" element={<NotAuth> <Auth /> </NotAuth>} />
            <Route path='/about' element={<Team />} />
            <Route path='/help' element={<Help />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/quiz/:id" element={<RequireAuth> <QuizPage /></RequireAuth>} />
            <Route path="/create-quiz" element={<RequireAuth><CreateQuiz /></RequireAuth>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Layout>
  );
}

export default App;