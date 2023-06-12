import React, { useState } from 'react';
import './ProductDetailPage.css';

const ProductDetailPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Add your logic here to add the product to the cart
    console.log(`Added ${quantity} product(s) to the cart.`);
  };

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-image">
          <img src={"http://localhost:3000" + product.image} alt="product" />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">Rs {product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {product.category.categoryName}</p>
          <div className="quantity-container">
            <button className="quantity-button" onClick={handleDecrease}>
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button className="quantity-button" onClick={handleIncrease}>
              +
            </button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
