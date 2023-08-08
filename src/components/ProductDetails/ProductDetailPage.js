import React, { useState } from 'react';
import './ProductDetailPage.css';
import { message } from 'antd';
import CartService from '../../services/cartService';

const ProductDetailPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart =(product,quantity,amount)=> {
        CartService.addtocart({product, quantity, amount})
            .then((response) => {
                setCartItems(response.data);
                console.log(response.data);
                if(response.status === 201){
                    message.success('Product added to cart successfully');
                    
                }       
            }
            )       
          };
    
   

    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1;
            return prevState - 1;
        });
    };
    const increment = () => {
        setQuantity((prevState) => prevState + 1);
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
            <button className="quantity-button" onClick={decrement}>
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button className="quantity-button" onClick={increment}>
              +
            </button>
          </div>
          <button className="add-to-cart-button" onClick={()=>handleAddToCart(product, quantity, product.price * quantity)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
