// components/DealsSection.tsx
// Displays time-limited deals with countdown timer

import React from 'react';
import { Card, Tag, Row, Col, Image, theme } from 'antd';

// Type definitions
interface DealProduct {
  id: number;
  image: string; // image URL or path
  name: string;
  discount: string; // e.g., "-20%"
}

const DealsSection: React.FC = () => {
  // Use Ant Design theme token
  const { token } = theme.useToken();
  
  // Set countdown deadline: 4 days, 12 hours, 58 minutes, 2 seconds from now (matching image)
  const initialTime = {
    days: 4,
    hours: 12,
    minutes: 58,
    seconds: 2
  };
  
  const deadline = Date.now() + 
    (1000 * 60 * 60 * 24 * initialTime.days) +
    (1000 * 60 * 60 * initialTime.hours) +
    (1000 * 60 * initialTime.minutes) +
    (1000 * initialTime.seconds);
  
  const dealsProducts: DealProduct[] = [
    { id: 1, image: '/images/deal-1.png', name: 'The Product name', discount: '-20%' },
    { id: 2, image: '/images/deal-2.png', name: 'The Product name', discount: '-5%' },
    { id: 3, image: '/images/deal-3.png', name: 'The Product name', discount: '-7%' },
    { id: 4, image: '/images/deal-4.png', name: 'The Product name', discount: '-50%' },
    { id: 5, image: '/images/deal-5.png', name: 'The Product name', discount: '-20%' },
  ];

  // Custom countdown timer
  const CustomCountdown = () => {
    const formatTime = (value: number) => value.toString().padStart(2, '0');
    
    const [timeLeft, setTimeLeft] = React.useState({
      days: initialTime.days,
      hours: initialTime.hours,
      minutes: initialTime.minutes,
      seconds: initialTime.seconds,
    });

    React.useEffect(() => {
      const timer = setInterval(() => {
        const now = Date.now();
        const distance = deadline - now;

        if (distance <= 0) {
          clearInterval(timer);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    }, [deadline]);
    
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: token.colorFillAlter,
            padding: '0.375rem 0.25rem',
            borderRadius: token.borderRadius,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            minWidth: '0px',
            fontFamily: 'monospace',
            color: token.colorText,
            border: `1px solid ${token.colorBorderSecondary}`
          }}>
            {formatTime(timeLeft.days)}
          </div>
          <div style={{ 
            marginTop: '0.125rem', 
            color: token.colorTextSecondary, 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}>
            Days
          </div>
        </div>
        
        <div style={{ 
          fontSize: '1rem', 
          color: token.colorTextSecondary,
          marginBottom: '1.25rem'
        }}>:</div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: token.colorFillAlter,
            padding: '0.375rem 0.25rem',
            borderRadius: token.borderRadius,
            fontSize: '1rem',
            fontWeight: 'bold',
            minWidth: '40px',
            fontFamily: 'monospace',
            color: token.colorText,
            border: `1px solid ${token.colorBorderSecondary}`
          }}>
            {formatTime(timeLeft.hours)}
          </div>
          <div style={{ 
            marginTop: '0.125rem', 
            color: token.colorTextSecondary, 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}>
            Hours
          </div>
        </div>
        
        <div style={{ 
          fontSize: '1rem', 
          color: token.colorTextSecondary,
          marginBottom: '1.25rem'
        }}>:</div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: token.colorFillAlter,
            padding: '0.375rem 0.25rem',
            borderRadius: token.borderRadius,
            fontSize: '1rem',
            fontWeight: 'bold',
            minWidth: '40px',
            fontFamily: 'monospace',
            color: token.colorText,
            border: `1px solid ${token.colorBorderSecondary}`
          }}>
            {formatTime(timeLeft.minutes)}
          </div>
          <div style={{ 
            marginTop: '0.125rem', 
            color: token.colorTextSecondary, 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}>
            Min
          </div>
        </div>
        
        <div style={{ 
          fontSize: '1rem', 
          color: token.colorTextSecondary,
          marginBottom: '1.25rem'
        }}>:</div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: token.colorFillAlter,
            padding: '0.375rem 0.25rem',
            borderRadius: token.borderRadius,
            fontSize: '1rem',
            fontWeight: 'bold',
            minWidth: '40px',
            fontFamily: 'monospace',
            color: token.colorText,
            // border: `1px solid ${token.colorBorderSecondary}`
          }}>
            {formatTime(timeLeft.seconds)}
          </div>
          <div style={{ 
            marginTop: '0.125rem', 
            color: token.colorTextSecondary, 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}>
            Sec
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card 
      style={{ 
        marginBottom: '1.5rem',
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadow,
        border: `1px solid ${token.colorBorder}`,
        background: token.colorBgContainer
      }}
      bodyStyle={{ padding: token.paddingLG }}
    >
      <Row gutter={[token.marginLG, token.margin]} align="middle">
        {/* Left side: Title and Timer Card - No Wrap */}
        <Col xs={24} md={5}>
          <div style={{
            background: token.colorBgContainer,
            padding: token.padding,
            borderRadius: token.borderRadius,
            border: `1px solid ${token.colorBorderSecondary}`,
            height: '100%',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            whiteSpace: 'nowrap'
          }}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: token.fontWeightStrong, 
                marginBottom: token.marginXS,
                color: token.colorTextHeading,
                lineHeight: token.lineHeightHeading1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Deals and offers
              </h2>
              <p style={{ 
                color: token.colorTextSecondary, 
                margin: 0, 
                fontSize: token.fontSize,
                fontWeight: token.fontWeightStrong,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Electronics & Gadgets
              </p>
            </div>
            
            <div style={{ whiteSpace: 'nowrap' }}>
              <CustomCountdown />
            </div>
          </div>
        </Col>
        
        {/* Right side: Product Cards */}
        <Col xs={24} md={19}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
            gap: token.margin,
          }}>
            {dealsProducts.map((product) => (
              <Card 
                key={product.id} 
                hoverable 
                style={{ 
                  textAlign: 'center',
                  borderRadius: token.borderRadius,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  background: token.colorBgContainer,
                  transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
                  height: '100%',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: token.paddingSM,
                  width: '100%'
                }}
                bodyStyle={{ 
                  padding: token.padding,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  gap: token.marginSM
                }}
              >
                <div style={{ 
                  width: '100%',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: token.marginXS
                }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    preview={false}
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                    fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNNTAgMzVMMzUgNTBMNTAgNjVMNjUgNTBMNTAgMzVaTTUwIDU1QzUzLjg2NiA1NSA1NyA1MS44NjYgNTcgNDhDNTcgNDQuMTM0IDUzLjg2NiA0MSA1MCA0MUM0Ni4xMzQgNDEgNDMgNDQuMTM0IDQzIDQ4QzQzIDUxLjg2NiA0Ni4xMzQgNTUgNTAgNTVaIiBmaWxsPSIjQ0NDQ0NDIi8+PC9zdmc+"
                  />
                </div>
                
                <h3 style={{ 
                  fontSize: token.fontSize, 
                  margin: 0,
                  fontWeight: '400',
                  color: token.colorText,
                  lineHeight: token.lineHeight,
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}>
                  {product.name}
                </h3>
                
                <Tag 
                  color="red" 
                  style={{ 
                    fontSize: token.fontSize,
                    padding: `4px ${token.paddingSM}px`,
                    borderRadius: token.borderRadiusSM,
                    fontWeight: token.fontWeightStrong,
                    border: 'none',
                    margin: 0,
                    minWidth: '55px'
                  }}
                >
                  {product.discount}
                </Tag>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default DealsSection;