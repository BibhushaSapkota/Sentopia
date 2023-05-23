import React from 'react';
import './Categories.css';
import Candle from './Candles.png';
import Fragrance from './Fragrance.jpg';

const Categories = () => {
  return (
    <section className="categories-section">
      <h2>Categories</h2>
      <div className="category-card">
        <img src={Candle} alt="Candles" />
        <h3>Candles</h3>
      </div>
      <div className="category-card">
        <img src={Fragrance} alt="Fragrance" />
        <h3>Fragrance</h3>
      </div>
    </section>
  );
};

export default Categories;
