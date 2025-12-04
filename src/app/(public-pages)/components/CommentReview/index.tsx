'use client';

import React from 'react';
import { Card, Rate, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  comments: number;
  image: string;
  colors: string[];
  sizes: string[];
  discount?: number;
  brand?: string;
  category?: string;
}

interface CommentReviewProps {
  product: Product;
  isDarkMode: boolean;
  token: any;
}

interface Review {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  verified: boolean;
  comment: string;
}

const CommentReview: React.FC<CommentReviewProps> = ({ product, isDarkMode, token }) => {
  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Michael Jonathan',
      avatar: '/avatars/michael.jpg',
      rating: 4.5,
      verified: true,
      comment: "It's a very good item. But it misprinted. Some chapters have issues with the starting characters (not printed). It doesn't affect the reading, but it's not the print I expected from Final UI."
    },
    {
      id: 2,
      name: 'Alex K.',
      avatar: '',
      rating: 4.5,
      verified: true,
      comment: "Really impressed with its quality, I liked it and started using it. Thanks Finalui, This is amazing Design System I have ever found on the internet"
    }
  ];

  return (
    <Card
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
        height: '100%'
      }}
      bodyStyle={{ padding: '32px' }}
    >
      {/* Reviews Header */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: 600,
        color: token.colorTextSecondary,
        marginBottom: '32px'
      }}>
        Reviews
      </h2>

      {/* Reviews List */}
      <div style={{ marginBottom: '32px' }}>
        {reviews.map((review, index) => (
          <div
            key={review.id}
            style={{
              marginBottom: index < reviews.length - 1 ? '32px' : '0'
            }}
          >
            <div style={{
              display: 'flex',
              gap: '16px'
            }}>
              {/* Avatar */}
              <Avatar
                size={56}
                icon={<UserOutlined />}
                src={review.avatar || undefined}
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                  color: token.colorTextSecondary,
                  flexShrink: 0
                }}
              />

              {/* Review Content */}
              <div style={{ flex: 1 }}>
                {/* Reviewer Name */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: token.colorText,
                  marginBottom: '8px'
                }}>
                  {review.name}
                </h3>

                {/* Rating and Verified Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <Rate
                    disabled
                    defaultValue={review.rating}
                    allowHalf
                    style={{ fontSize: '16px' }}
                  />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: token.colorTextSecondary
                  }}>
                    {review.rating}
                  </span>
                  <span style={{ color: token.colorTextSecondary }}>•</span>
                  {review.verified && (
                    <span style={{
                      fontSize: '14px',
                      color: '#52c41a',
                      fontWeight: 500
                    }}>
                      Verified buyer
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: token.colorText,
                  margin: 0
                }}>
                  {review.comment}
                </p>
              </div>
            </div>

            {/* Divider between reviews */}
            {index < reviews.length - 1 && (
              <div style={{
                height: '1px',
                backgroundColor: isDarkMode ? '#303030' : '#e0e0e0',
                marginTop: '32px'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* View All Comments Button */}
      <Button
        block
        size="large"
        style={{
          height: '52px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 500,
          backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
          border: 'none',
          color: token.colorText
        }}
      >
        View all {product.comments} comments
      </Button>
    </Card>
  );
};

export default CommentReview;