import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import Candle from './Candles.png';
import Fragrance from './Fragrance.jpg';

const Categories = () => {
  const Navigate=useNavigate()

  const handleclick=()=>{
    Navigate('/products')
  }

  return (
    <section className="categories-section">
      <h2>Categories</h2>
      <div className="category-card" onClick={handleclick}>
        <img src={Candle} alt="Candles" />
        <h3>Candles</h3>

      </div>
      <div className="category-card" onClick={handleclick}>
        <img src={Fragrance} alt="Fragrance" />
        <h3>Fragrance</h3>
      </div>
    </section>
  );
};

export default Categories;
