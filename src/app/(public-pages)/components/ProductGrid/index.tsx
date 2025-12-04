"use client";

import React from "react";
import { Card, Rate, Button } from "antd";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <Card
      style={{
        marginBottom: "var(--ant-margin-lg)",
        padding: "var(--ant-padding) var(--ant-padding-lg)",
        borderRadius: "var(--ant-border-radius-lg)",
        background: "var(--ant-color-bg-container)",
        borderColor: "var(--ant-color-border-secondary)",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
          fontWeight: "var(--ant-font-weight-strong)",
          marginBottom: "var(--ant-margin-lg)",
          color: "var(--ant-color-text-heading)",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
          rowGap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{
              padding: 0,
              margin: 0,
              borderRadius: "var(--ant-border-radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--ant-color-border-secondary)",
              background: "var(--ant-color-bg-container)",
              boxShadow: "var(--ant-box-shadow-secondary)",
              transition: "all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out)",
            }}
            bodyStyle={{ padding: 0 }}
          >
            {/* IMAGE CONTAINER */}
            <div
              style={{
                width: "100%",
                height: "200px",
                background: "var(--ant-color-bg-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                  maxWidth: "250px",
                  maxHeight: "200px",
                }}
              />
            </div>

            {/* CONTENT AREA */}
            <div
              style={{
                padding: "var(--ant-padding)",
                background: "var(--ant-color-bg-container)",
                color: "var(--ant-color-text)",
              }}
            >
              {/* PRICE */}
              <div
                style={{
                  fontSize: "var(--ant-font-size-lg)",
                  fontWeight: "var(--ant-font-weight-strong)",
                  marginBottom: "var(--ant-margin-xs)",
                  color: "var(--ant-color-text-heading)",
                }}
              >
                ${product.price.toFixed(2)}

                {product.oldPrice && (
                  <span
                    style={{
                      fontSize: "var(--ant-font-size-sm)",
                      color: "var(--ant-color-text-secondary)",
                      marginLeft: "var(--ant-margin-xs)",
                      textDecoration: "line-through",
                    }}
                  >
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* RATING */}
              {product.rating && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ant-margin-xs)",
                    marginBottom: "var(--ant-margin-sm)",
                  }}
                >
                  <Rate 
                    disabled 
                    defaultValue={product.rating} 
                    style={{ fontSize: "var(--ant-font-size-sm)" }}
                  />
                  <span style={{ 
                    fontSize: "var(--ant-font-size-sm)", 
                    color: "var(--ant-color-warning)" 
                  }}>
                    {product.rating}
                  </span>
                </div>
              )}

              {/* PRODUCT NAME */}
              <p
                style={{
                  fontSize: "var(--ant-font-size)",
                  margin: 0,
                  lineHeight: "var(--ant-line-height)",
                  color: "var(--ant-color-text)",
                }}
              >
                {product.name}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ 
        textAlign: "center", 
        marginTop: "var(--ant-margin-lg)",
        paddingTop: "var(--ant-padding-lg)",
        borderTop: "1px solid var(--ant-color-border-split)"
      }}>
        <Button 
          type="primary" 
          size="large"
          style={{
            background: "var(--ant-color-primary)",
            borderColor: "var(--ant-color-primary)",
            borderRadius: "var(--ant-border-radius)",
            padding: "var(--ant-padding-sm) var(--ant-padding-lg)",
            fontSize: "var(--ant-font-size)",
            fontWeight: "var(--ant-font-weight-medium)",
          }}
        >
          See More
        </Button>
      </div>
    </Card>
  );
};

export default function Home() {
  const products: Product[] = [
    { id: 1, image: "/images/product1.png", name: "Great product name goes here similar to this", price: 76, oldPrice: 1128, rating: 4.5 },
    { id: 2, image: "/images/product2.png", name: "Item 2", price: 1970, rating: 4.5 },
    { id: 3, image: "/images/product3.png", name: "Item 3", price: 176, rating: 4.5 },
    { id: 4, image: "/images/product4.png", name: "Item 4", price: 89, oldPrice: 121, rating: 4.4 },
    { id: 5, image: "/images/product5.png", name: "Item 5", price: 59, rating: 4.2 },
    { id: 6, image: "/images/product6.png", name: "Item 6", price: 88, rating: 4.5 },
    { id: 7, image: "/images/product7.png", name: "Item 7", price: 560, rating: 4 },
    { id: 8, image: "/images/product8.png", name: "Item 8", price: 125, rating: 5 },
    { id: 9, image: "/images/product9.png", name: "Item 9", price: 300, rating: 3.5 },
    { id: 10, image: "/images/product11.png", name: "Item 10", price: 150, rating: 4.2 },
  ];

  return (
    <div style={{ 
      padding: "var(--ant-padding-lg)",
      maxWidth: "100vw",
      margin: "0 auto",
      background: "var(--ant-color-bg-layout)",
      minHeight: "100vh",
    }}>
      <ProductGrid title="Recommended Products" products={products} />
    </div>
  );
}