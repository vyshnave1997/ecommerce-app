// components/Hero.tsx
'use client';

import React from 'react';
import { Card, Button, theme } from 'antd';
import { useRouter } from 'next/navigation';
import {
  DesktopOutlined,
  ShoppingOutlined,
  HomeOutlined,
  BookOutlined,
  ToolOutlined,
  TrophyOutlined,
  HeartOutlined,
  SmileOutlined,
  EllipsisOutlined,
  MobileOutlined,
  UserOutlined
} from '@ant-design/icons';

// BackgroundGradient Component for dark mode
const BackgroundGradient = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-sm"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

const Hero = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  
  // Detect dark mode
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';

  const categories = [
    { icon: <DesktopOutlined />, name: 'Electronics' },
    { icon: <ShoppingOutlined />, name: 'Clothes and wear' },
    { icon: <HomeOutlined />, name: 'Home interiors' },
    { icon: <BookOutlined />, name: 'Books & magazines' },
    { icon: <ToolOutlined />, name: 'Tools, equipments' },
    { icon: <TrophyOutlined />, name: 'Sports and outdoor' },
    { icon: <HeartOutlined />, name: 'Animal and pets' },
    { icon: <SmileOutlined />, name: 'Toys for Kids' },
    { icon: <EllipsisOutlined />, name: 'More category' },
  ];

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/ProductList?category=${encodeURIComponent(categoryName)}`);
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isDarkMode) {
      return (
        <BackgroundGradient className="rounded-2xl p-[2px] h-full">
          <div className="h-full">{children}</div>
        </BackgroundGradient>
      );
    }
    return children;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '250px 1fr 320px',
      gap: '1.5rem',
      marginBottom: '2rem',
      alignItems: 'start',
    }}>
      {/* Categories Sidebar */}
      <Card 
        id="sidebar-card"
        className="desktop-only" 
        style={{ 
          gridColumn: 'span 1',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: token.colorBgContainer,
          borderColor: token.colorBorder,
        }}
        bodyStyle={{ 
          padding: '0',
          flex: 1,
        }}
      >
        <div style={{ 
          padding: '1rem 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'background 0.2s',
                flex: 1,
                minHeight: '44px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ 
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                color: isDarkMode ? '#8b5cf6' : '#1890ff'
              }}>
                {cat.icon}
              </span>
              <span style={{ 
                fontSize: '0.95rem', 
                color: isDarkMode ? '#e5e7eb' : '#333'
              }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Banner with Wobbly Effect */}
      <CardWrapper>
        <Card 
          className="wobbly-card"
          style={{
            background: isDarkMode 
              ? token.colorBgContainer
              : 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
            color: isDarkMode ? token.colorText : 'white',
            gridColumn: 'span 1',
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'wobbly 3s ease-in-out infinite',
          }}
          bodyStyle={{ 
            padding: '2rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            maxWidth: '50%',
            zIndex: 2,
          }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem', 
              color: isDarkMode ? token.colorTextHeading : 'white',
              lineHeight: '1.2',
            }}>
              New trending
            </h1>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              color: isDarkMode ? token.colorTextHeading : 'white',
              lineHeight: '1.1',
            }}>
              Electronic items
            </h2>
            <Button 
              size="large"
              onClick={() => handleCategoryClick('Electronics')}
              style={{
                background: isDarkMode 
                  ? 'transparent'
                  : 'white',
                color: isDarkMode ? 'white' : '#29B6F6',
                border: isDarkMode 
                  ? '2px solid transparent'
                  : 'none',
                backgroundImage: isDarkMode
                  ? 'linear-gradient(#1f1f1f, #1f1f1f), linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                  : 'none',
                backgroundOrigin: 'border-box',
                backgroundClip: isDarkMode ? 'padding-box, border-box' : 'padding-box',
                fontWeight: '500',
                padding: '0.5rem 2rem',
                height: 'auto',
              }}
            >
              Learn more
            </Button>
          </div>
          
          {/* Phone Image Placeholder */}
          <div style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '45%',
            height: '70%',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
            <MobileOutlined style={{ 
              fontSize: '5rem',
              opacity: 0.3, 
              color: isDarkMode ? 'white' : 'black'
            }} />
          </div>
        </Card>
      </CardWrapper>

      {/* Promo Card with Wobbly Effect */}
      <CardWrapper>
        <Card 
          className="wobbly-card"
          style={{
            background: isDarkMode 
              ? token.colorBgContainer
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: isDarkMode ? token.colorText : '#ffffff',
            gridColumn: 'span 1',
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'wobbly 3s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
          bodyStyle={{ 
            padding: '2rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ zIndex: 2 }}>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem',
              color: isDarkMode ? token.colorTextHeading : 'white',
            }}>
              Get US $10 off
            </h3>
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '2rem',
              color: isDarkMode ? token.colorTextSecondary : 'rgba(255, 255, 255, 0.9)',
            }}>
              for first order
            </p>
            <Button 
              size="large" 
              ghost={!isDarkMode}
              style={{
                background: isDarkMode 
                  ? 'transparent'
                  : 'transparent',
                color: 'white',
                border: isDarkMode 
                  ? '2px solid transparent'
                  : '1px solid white',
                backgroundImage: isDarkMode
                  ? 'linear-gradient(#1f1f1f, #1f1f1f), linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'none',
                backgroundOrigin: 'border-box',
                backgroundClip: isDarkMode ? 'padding-box, border-box' : 'padding-box',
                fontWeight: '500',
                padding: '0.5rem 2rem',
                height: 'auto',
              }}
            >
              Get offer
            </Button>
          </div>
          
          {/* Person Image Placeholder */}
          <div style={{
            position: 'absolute',
            right: '-10%',
            bottom: 0,
            width: '70%',
            height: '60%',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px 20px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
            <UserOutlined style={{ 
              fontSize: '5rem',
              opacity: 0.2, 
              color: isDarkMode ? 'white' : 'black'
            }} />
          </div>
        </Card>
      </CardWrapper>

      {/* Wobbly Animation CSS */}
      <style>{`
        @keyframes wobbly {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-3px) rotate(0.5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(3px) rotate(-0.5deg);
          }
        }

        .wobbly-card {
          height: auto !important;
        }

        #sidebar-card {
          height: auto !important;
        }
        
        /* Make wobbly cards match sidebar height */
        @media (min-width: 768px) {
          .wobbly-card,
          .wobbly-card > div {
            min-height: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;