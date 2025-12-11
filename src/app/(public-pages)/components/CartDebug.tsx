'use client';

import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { useCart } from '../context/CartContext';

const CartDebug: React.FC = () => {
  const { items, getCartCount, getCartTotal } = useCart();

  useEffect(() => {
    console.log('=== CART DEBUG ===');
    console.log('Items in cart:', items);
    console.log('Cart count:', getCartCount());
    console.log('Cart total:', getCartTotal());
    console.log('LocalStorage cart:', localStorage.getItem('shopping-cart'));
  }, [items]);

  const clearLocalStorage = () => {
    localStorage.removeItem('shopping-cart');
    window.location.reload();
  };

  return (
    <Card 
      title="🔍 Cart Debug Info" 
      style={{ 
        marginBottom: '20px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <strong>Items in Cart:</strong> {items.length}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Total Items:</strong> {getCartCount()}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Total Price:</strong> ${getCartTotal().toFixed(2)}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Items Array:</strong>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>
      <Button danger onClick={clearLocalStorage}>
        Clear Cart & Reload
      </Button>
    </Card>
  );
};

export default CartDebug;