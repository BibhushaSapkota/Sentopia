import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TopProducts/TopProducts.css';
import productService from '../../services/productService';
import ProductCard from './ProductCard';

const Products = ({products,setProducts}) => {
    const navigate = useNavigate()
    useEffect(() => {
        productService.getAll()
            .then(res =>{setProducts(res.data.data)})
            .catch(err => console.log(err))
    }, [])

   
  

  return (
    <section className="top-products-section" id="top-products">
      <h2>Products</h2>
      <div className="top-products-container" >
        {products.map((product, index) => (
          <ProductCard product={product} key={index}/>
        ))}
      
      </div>
    </section>
  );
};

export default Products;
