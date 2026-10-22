import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Placeholder thumbnail (always loads). Replace `image` values with real photo URLs when you have them.
const leafArt = (bg, fg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${bg}"/>` +
      `<path d="M100 170 C100 120 100 90 100 50" stroke="${fg}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M100 120 C60 120 40 90 45 60 C80 60 100 85 100 120Z" fill="${fg}"/>` +
      `<path d="M100 95 C140 95 160 65 155 35 C120 35 100 60 100 95Z" fill="${fg}" opacity="0.8"/>` +
      `<rect x="70" y="165" width="60" height="25" rx="4" fill="#8a5a3c"/></svg>`
  );

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and needs very little water.', cost: 15, image: leafArt('#e3efd9', '#3f7a4a') },
      { name: 'Spider Plant', description: 'Fast-growing and forgiving, ideal for hanging baskets.', cost: 12, image: leafArt('#eaf3e0', '#5c9a53') },
      { name: 'Peace Lily', description: 'Glossy leaves and white blooms that signal when it is thirsty.', cost: 18, image: leafArt('#dfeee6', '#2f6f4e') },
      { name: 'Boston Fern', description: 'Lush fronds that add moisture to dry indoor air.', cost: 20, image: leafArt('#e6f1da', '#4c8a3c') },
      { name: 'Rubber Plant', description: 'Bold, glossy leaves that thrive in bright indirect light.', cost: 22, image: leafArt('#e1ecd8', '#2e5f3a') },
      { name: 'Aloe Vera', description: 'A tough succulent with soothing gel inside its leaves.', cost: 14, image: leafArt('#eef4d9', '#7ca74a') },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', description: 'Nearly indestructible and happy in dim corners.', cost: 25, image: leafArt('#dce9d6', '#2d5e3a') },
      { name: 'Pothos', description: 'Trailing vines that grow well with little light.', cost: 10, image: leafArt('#e8f2dc', '#5d9b4a') },
      { name: 'Cast Iron Plant', description: 'Lives up to its name by tolerating neglect and shade.', cost: 28, image: leafArt('#d9e7d3', '#264f33') },
      { name: 'Chinese Evergreen', description: 'Patterned leaves that brighten shaded rooms.', cost: 19, image: leafArt('#e5f0d8', '#468a52') },
      { name: 'Dracaena', description: 'Upright, sculptural growth with low maintenance needs.', cost: 24, image: leafArt('#e0ecd5', '#37704a') },
      { name: 'Philodendron', description: 'Heart-shaped leaves that cope with indoor shade.', cost: 16, image: leafArt('#e9f3df', '#4f9450') },
    ],
  },
  {
    category: 'Pet Friendly Plants',
    plants: [
      { name: 'Parlor Palm', description: 'Soft arching fronds, non-toxic to cats and dogs.', cost: 21, image: leafArt('#e4efd8', '#3d8048') },
      { name: 'Areca Palm', description: 'A feathery, tropical look that is safe around pets.', cost: 30, image: leafArt('#e9f2d7', '#6a9f3d') },
      { name: 'Calathea', description: 'Striking patterned leaves that fold up at night.', cost: 23, image: leafArt('#dfeadb', '#2f6a45') },
      { name: 'Prayer Plant', description: 'Colorful leaves that move with the daylight.', cost: 17, image: leafArt('#e7f1dc', '#5a9a4d') },
      { name: 'Money Tree', description: 'Braided trunk and bright green leaves, pet safe.', cost: 32, image: leafArt('#e2edd6', '#3a7a42') },
      { name: 'Bamboo Palm', description: 'Elegant, airy fronds that suit bright corners.', cost: 27, image: leafArt('#ebf3dc', '#4e8f3f') },
    ],
  },
];

const CartIcon = () => (
  <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.6 11.2a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
  </svg>
);

// Shared by the Plants and Cart pages
export function Navbar({ current, onNavigate }) {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar" aria-label="Main">
      <button className="navbar-brand" onClick={() => onNavigate('home')}>
        Paradise Nursery
      </button>
      <div className="navbar-links">
        <button className={`nav-link ${current === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>
          Home
        </button>
        <button className={`nav-link ${current === 'plants' ? 'active' : ''}`} onClick={() => onNavigate('plants')}>
          Plants
        </button>
        <button
          className={`nav-link cart-link ${current === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
          aria-label={`Cart, ${totalItems} items`}
        >
          <CartIcon />
          <span className="cart-count">{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <Navbar current="plants" onNavigate={onNavigate} />
      <main className="page">
        {plantCategories.map((group) => (
          <section className="category" key={group.category}>
            <h2>{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <article className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="product-body">
                    <h3>{plant.name}</h3>
                    <p className="product-desc">{plant.description}</p>
                    <span className="product-price">${plant.cost}</span>
                    <button
                      className="btn btn-dark"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
