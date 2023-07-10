import React from 'react';
import { ToastContainer} from 'react-toastify';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from "../components/Home";
import About from "../About/About";
import Help from "../Help/Help";
import { Auth } from "../AuthSection/Auth";
import { NotFound } from "../components/NotFound";
import Header from '../Header/Header';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [user, setUser] = useState(localStorage.getItem("QuizyUser") ? JSON.parse(localStorage.getItem("QuizyUser")) : null)
  const signIn = (props) => {
    setUser(props)
  }

  return (
    <>
    <div className="App">
      <ToastContainer/>
      <Header />
      <Home />
      <About />
      <Help />
      <Auth />
    </div>
    <Routes>
      <Route path="/" exact element={Home} />
      <Route path="/about" element={About} />
      <Route path="/help" element={Help} />
      <Route path="/login" element={Auth} />
      <Route path="/signup" element={NotFound} />
    </Routes>
  </>
  );
}

export default App;
