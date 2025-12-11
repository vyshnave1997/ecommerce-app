'use client';

import React from 'react';
import { Row, Col } from 'antd';
import CartList from '../CartList';
import Checkout from '../CheckOut';
import { useCart } from '../../context/CartContext';

const CartLayout: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <Row gutter={[24, 24]}>
      {/* Left Column - Cart List */}
      <Col xs={24} lg={16}>
        <CartList
          items={items}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </Col>

      {/* Right Column - Checkout */}
      <Col xs={24} lg={8}>
        <Checkout items={items} />
      </Col>
    </Row>
  );
};

export default CartLayout;