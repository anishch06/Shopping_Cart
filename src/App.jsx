import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  // 'home' | 'plants' | 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') {
    return <ProductList onNavigate={setPage} />;
  }

  if (page === 'cart') {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <div className="landing">
      <div className="landing-overlay">
        <div className="landing-hero">
          <h1>Paradise Nursery</h1>
          <p className="landing-tagline">Where green meets serenity</p>
          <button className="btn btn-primary" onClick={() => setPage('plants')}>
            Get Started
          </button>
        </div>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
