import React from 'react';
import LoginPage from './components/Login';
import Home from './components/Home';
import RegisterPage from './components/Registration';
import {Routes,Route,useMatch } from 'react-router-dom';



import './App.css';

function App() {
  return (
   <div> 
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>

    </Routes>
   </div>
  );
}

export default App;

