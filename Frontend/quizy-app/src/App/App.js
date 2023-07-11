import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { useEffect, useState } from 'react';
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
    </div>
    <div id="detail">
      <Outlet />
    </div>
    </>
  );
}

export default App;