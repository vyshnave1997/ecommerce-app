'use client';

import React from 'react';
import { Row, Col, message } from 'antd';
import WishlistList from '../WishlistItemList';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistLayout: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    message.success('Item removed from wishlist');
  };

  const handleAddToCart = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      // Add to cart with default quantity of 1
      // Don't pass the cart id - let addToCart generate it
      // But pass the productId (wishlist item id)
      addToCart({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        color: item.color,
        size: item.size,
        discount: item.discount
      });
      // Optionally remove from wishlist after adding to cart
      removeFromWishlist(id);
      message.success('Item added to cart!');
    }
  };

  return (
    <Row>
      <Col xs={24}>
        <WishlistList
          items={items}
          onRemove={handleRemove}
          onAddToCart={handleAddToCart}
        />
      </Col>
    </Row>
  );
};

export default WishlistLayout;