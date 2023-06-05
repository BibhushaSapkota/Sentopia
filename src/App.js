import React from 'react';
import {useState} from 'react';
import LoginPage from './components/Login';
import Home from './components/Home';
import RegisterPage from './components/Registration';
import Products from './components/Candles/CandlePage';
import {Routes,Route,useMatch } from 'react-router-dom';



import './App.css';

function App() {
  const [products,setProducts]=useState([])
  const match=useMatch('/products/:id')
  const product=match
                ?products.find(p=>p._id===match.params.id)
                :null

  return (
   <div> 
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="products" element={<Products products={products} setProducts={setProducts} />} exact/>

    </Routes>
   </div>
  );
}

export default App;

