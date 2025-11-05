import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  // ⚡ Function to show alert
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });

    // ⏱️ Auto-dismiss alert after 2 seconds
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState showAlert={showAlert}> {/* ✅ Pass showAlert to context */}
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;


//if a user already login in the application and then closes the applicaton the chrome will remember that person
//and he not require login 