import React, { useEffect } from 'react';
import '../TopProducts/TopProducts.css';
import productService from '../../services/productService';

const Products = ({products,setProducts}) => {
    useEffect(() => {
        productService.getAll()
            .then(res =>{setProducts(res.data.data)})
            .catch(err => console.log(err))
    }, [])

  return (
    <section className="top-products-section" id="top-products">
      <h2>Candles</h2>
      <div className="top-products-container">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={"http://localhost:3000"+product.image} alt="product"/>
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
