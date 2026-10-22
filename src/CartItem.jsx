import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showNotice, setShowNotice] = useState(false);

  const itemTotal = (item) => item.cost * item.quantity;
  const cartTotal = items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the item
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div>
      <Navbar current="cart" onNavigate={onNavigate} />
      <main className="page cart-page">
        <h1>Your Cart</h1>
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty. Pick a plant to get started.</p>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <div className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p className="unit">${item.cost.toFixed(2)} each</p>
                </div>
                <div className="qty">
                  <button onClick={() => handleDecrement(item)} aria-label={`Decrease quantity of ${item.name}`}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                </div>
                <div className="cart-right">
                  <div className="cart-line-total">${itemTotal(item).toFixed(2)}</div>
                  <button className="btn-delete" onClick={() => dispatch(removeItem(item.name))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="btn btn-dark" onClick={() => onNavigate('plants')}>
            Continue Shopping
          </button>
          <button className="btn btn-primary" onClick={() => setShowNotice(true)}>
            Checkout
          </button>
        </div>
        {showNotice && <p className="notice" role="status">Checkout is coming soon.</p>}
      </main>
    </div>
  );
}

export default CartItem;
