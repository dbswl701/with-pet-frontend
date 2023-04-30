import React from 'react';
import Users from "./ApiTest";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
