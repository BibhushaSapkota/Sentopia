import React from 'react';
import './TopProducts.css';
import ProductImage1 from './Product1.jpg';
import ProductImage2 from './Product2.jpg';
import ProductImage3 from './Product3.jpg';

const TopProducts = () => {
  const products = [
    {
      name: 'Product 1',
      price: 999,
      category: 'Candles',
      image: ProductImage1,
    },
    {
      name: 'Product 2',
      price: 1499,
      category: 'Fragrance',
      image: ProductImage2,
    },
    {
      name: 'Product 3',
      price: 1299,
      category: 'Candles',
      image: ProductImage3,
    },
  ];

  return (
    <section className="top-products-section" id="top-products">
      <h2>Top Products</h2>
      <div className="top-products-container">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: Rs.{product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProducts;
