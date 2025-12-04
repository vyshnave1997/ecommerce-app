import React, { useEffect, useState } from 'react';
import { theme } from 'antd';

// Meteors Component
const Meteors = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className="meteor"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 0.6 + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
          }}
        />
      ))}
    </>
  );
};

// Gradient Border Component
const GradientBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inline-block p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
      {children}
    </div>
  );
};

const Banner = () => {
  const { token } = theme.useToken();
  const [mounted, setMounted] = useState(false);
  
  // Detect dark mode
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      width: '100%',
      marginBottom: '2rem',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100px',
        overflow: 'hidden',
      }}>
        {/* Background blur effect - only in dark mode */}
        {isDarkMode && (
          <div style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            transform: 'scale(0.80)',
            borderRadius: '9999px',
            background: 'linear-gradient(to right, rgb(59, 130, 246), rgb(20, 184, 166))',
            filter: 'blur(48px)',
          }} />
        )}

        {/* Main Banner Content */}
        <div style={{
          position: 'relative',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
          borderRadius: '16px',
          border: isDarkMode ? `1px solid ${token.colorBorder}` : 'none',
          background: isDarkMode 
            ? token.colorBgContainer
            : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
          padding: '0 3rem',
          boxShadow: token.boxShadow,
        }}>
          {/* Left Content */}
          <div style={{
            position: 'relative',
            zIndex: 50,
            maxWidth: '60%',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isDarkMode ? token.colorTextHeading : 'white',
              marginBottom: '0.5rem',
            }}>
              Latest super offer on electronics
            </h2>
            <p style={{
              fontSize: '0.875rem',
              color: isDarkMode ? token.colorTextSecondary : 'rgba(255, 255, 255, 0.9)',
            }}>
              Get the best deals on trending products today
            </p>
          </div>

          {/* Right Content - Discount Card & Button */}
          <div style={{
            position: 'relative',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            {/* Discount Card - 20% width, 70px height with image */}
            {isDarkMode ? (
              <GradientBorder>
                <div style={{
                  width: '140px',
                  height: '70px',
                  backgroundColor: token.colorBgContainer,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  gap: '0.5rem',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: token.colorPrimary,
                      lineHeight: '1',
                    }}>
                      25% OFF
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: token.colorTextSecondary,
                      marginTop: '0.25rem',
                    }}>
                      Limited time
                    </div>
                  </div>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    border: `1px solid ${token.colorBorder}`,
                  }}>
                    📱
                  </div>
                </div>
              </GradientBorder>
            ) : (
              <div style={{
                width: '140px',
                height: '70px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    lineHeight: '1',
                  }}>
                    25% OFF
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginTop: '0.25rem',
                  }}>
                    Limited time
                  </div>
                </div>
                <div style={{
                  width: '45px',
                  height: '45px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                  📱
                </div>
              </div>
            )}

            {/* Button */}
            {isDarkMode ? (
              <GradientBorder>
                <button
                  onClick={() => alert('Shop now!')}
                  style={{
                    padding: '0.5rem 2rem',
                    backgroundColor: token.colorBgContainer,
                    color: token.colorText,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  Shop now
                </button>
              </GradientBorder>
            ) : (
              <button
                onClick={() => alert('Shop now!')}
                style={{
                  padding: '0.5rem 2rem',
                  backgroundColor: 'white',
                  color: '#FF6B6B',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                Shop now
              </button>
            )}
          </div>

          {/* Meteor Effect - Only in dark mode */}
          {isDarkMode && <Meteors number={15} />}
        </div>
      </div>

      {/* Meteor Animation CSS */}
      <style>{`
        .meteor {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
          animation: meteor-animation linear infinite;
          pointer-events: none;
        }

        .meteor::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, rgba(168, 85, 247, 0) 0%, rgba(168, 85, 247, 1) 100%);
        }

        @keyframes meteor-animation {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .meteor::before {
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;