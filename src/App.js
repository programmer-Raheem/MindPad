import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ removed BrowserRouter as Router
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState showAlert={showAlert}>
      {/* ❌ Removed <Router> and </Router> */}
      <Navbar />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
        </Routes>
      </div>
    </NoteState>
  );
}

export default App;



//if a user already login in the application and then closes the applicaton the chrome will remember that person
//and he not require login 