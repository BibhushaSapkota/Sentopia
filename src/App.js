import React from 'react';
import {useState} from 'react';
import LoginPage from './components/Login';
import Home from './components/Home';
import RegisterPage from './components/Registration';
import Products from './components/Products/ProductPage';
import ProductDetailtPage from './components/ProductDetails/ProductDetailPage';
import {Routes,Route,useMatch } from 'react-router-dom';
import Homeadmin from './components/AdminPanel/Home';	
import EditProduct from './components/AdminPanel/Contents/EditProduct';




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
    <Route path="/products/:id" element={<ProductDetailtPage product={product}/>} exact/> 
    <Route path="*" element={<h1>404 Not Found</h1>}/>
    <Route path="/admin" element={<Homeadmin/>}/> 
    <Route path="/editProduct" element={<EditProduct/>} exact/>

    </Routes>
   </div>
  );
}

export default App;

