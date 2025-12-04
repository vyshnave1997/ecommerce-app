// components/Navbar.tsx
// Main navigation bar with search, cart, and mobile menu support

import React, { useState } from 'react';
import { Badge, Input, Button, Drawer, Menu, Divider, Select } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  SearchOutlined,
  DownOutlined,
  ShoppingOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';

interface NavbarProps {
  darkMode: boolean; // Current theme state
  toggleTheme: () => void; // Function to toggle between light/dark mode
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryItems = [
    { key: '1', label: 'Electronics', icon: '💻' },
    { key: '2', label: 'Clothes and wear', icon: '👕' },
    { key: '3', label: 'Home interiors', icon: '🏠' },
    { key: '4', label: 'Books & magazines', icon: '📚' },
    { key: '5', label: 'Tools, equipments', icon: '🔧' },
    { key: '6', label: 'Sports and outdoor', icon: '⚽' },
    { key: '7', label: 'Animal and pets', icon: '🐾' },
    { key: '8', label: 'Toys for Kids', icon: '🧸' },
    { key: '9', label: 'More category', icon: '⋯' },
  ];

  return (
    <>
      <nav style={{
        background: darkMode ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Top Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 0',
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              }}>
                B
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: darkMode ? '#ffffff' : '#000000',
                transition: 'color 0.3s ease',
              }}>
                Brand<span style={{ color: '#667eea' }}>name</span>
              </span>
            </div>

            {/* Search Bar */}
            <div style={{
              flex: 1,
              maxWidth: '700px',
              margin: '0 2rem',
            }} className="desktop-search">
              <Input
                size="large"
                placeholder="Search products..."
                prefix={<SearchOutlined style={{ color: '#999' }} />}
                suffix={
                  <Button 
                    type="primary" 
                    style={{ 
                      borderRadius: '0 8px 8px 0',
                      background: '#5f63f2',
                      borderColor: '#5f63f2',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#4a4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#5f63f2';
                    }}
                  >
                    Search
                  </Button>
                }
                style={{
                  borderRadius: '8px',
                  background: darkMode ? '#2a2a2a' : '#ffffff',
                  borderColor: darkMode ? '#404040' : '#d9d9d9',
                  color: darkMode ? '#ffffff' : '#000000',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>

            {/* Right Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}>
              {/* Dark Mode Toggle */}
              <div 
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: '0.25rem',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {darkMode ? (
                  <BulbFilled style={{ 
                    fontSize: '1.5rem', 
                    color: '#ffd666',
                    filter: 'drop-shadow(0 0 8px rgba(255, 214, 102, 0.5))',
                  }} />
                ) : (
                  <BulbOutlined style={{ 
                    fontSize: '1.5rem', 
                    color: '#666',
                  }} />
                )}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }}>
                  {darkMode ? 'Light' : 'Dark'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '0.25rem',
                transition: 'transform 0.3s ease',
              }} 
              className="desktop-only"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <ShoppingOutlined style={{ 
                  fontSize: '1.5rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }}>Orders</span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '0.25rem',
                transition: 'transform 0.3s ease',
              }} 
              className="desktop-only"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <HeartOutlined style={{ 
                  fontSize: '1.5rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }}>Saved</span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '0.25rem',
                transition: 'transform 0.3s ease',
              }} 
              className="desktop-only"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <ShoppingCartOutlined style={{ 
                  fontSize: '1.5rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }}>My cart</span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '0.25rem',
                transition: 'transform 0.3s ease',
              }} 
              className="desktop-only"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <UserOutlined style={{ 
                  fontSize: '1.5rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: darkMode ? '#ffffff' : '#666',
                  transition: 'color 0.3s ease',
                }}>Sign in</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="desktop-only" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            paddingBottom: '1rem',
            borderTop: `1px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
            paddingTop: '1rem',
            transition: 'border-color 0.3s ease',
          }}>
            <Button 
              icon={<MenuOutlined />}
              style={{
                border: 'none',
                background: 'transparent',
                color: darkMode ? '#ffffff' : '#000000',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              All categories
            </Button>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>Recommends</a>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>New arrivals</a>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>Bestsellers</a>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>Gift boxes</a>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>Articles</a>
            <a href="#" style={{ 
              color: darkMode ? '#ffffff' : '#666', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5f63f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#666';
            }}>
              More <DownOutlined style={{ fontSize: '0.75rem' }} />
            </a>
            
            <div style={{ 
              marginLeft: 'auto', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              <span style={{ 
                color: darkMode ? '#ffffff' : '#666', 
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
              }}>DE Germany, € EUR</span>
              <DownOutlined style={{ 
                fontSize: '0.75rem', 
                color: darkMode ? '#ffffff' : '#666',
                transition: 'color 0.3s ease',
              }} />
            </div>
          </div>

          {/* Mobile Header */}
          <div className="mobile-only" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
          }}>
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: darkMode ? '#ffffff' : '#000000' }} />}
              onClick={() => setMobileMenuOpen(true)}
            />
            
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ 
                flex: 1, 
                margin: '0 1rem',
                background: darkMode ? '#2a2a2a' : '#ffffff',
                borderColor: darkMode ? '#404040' : '#d9d9d9',
                color: darkMode ? '#ffffff' : '#000000',
              }}
            />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {darkMode ? (
                <BulbFilled 
                  onClick={toggleTheme}
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#ffd666',
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 0 8px rgba(255, 214, 102, 0.5))',
                  }} 
                />
              ) : (
                <BulbOutlined 
                  onClick={toggleTheme}
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#666',
                    cursor: 'pointer',
                  }} 
                />
              )}
              <ShoppingCartOutlined style={{ 
                fontSize: '1.5rem',
                color: darkMode ? '#ffffff' : '#000000',
              }} />
              <UserOutlined style={{ 
                fontSize: '1.5rem',
                color: darkMode ? '#ffffff' : '#000000',
              }} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        styles={{
          header: {
            background: darkMode ? '#1a1a1a' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`,
            color: darkMode ? '#ffffff' : '#000000',
          },
          body: {
            background: darkMode ? '#1a1a1a' : '#ffffff',
            padding: 0,
          },
        }}
      >
        <Menu 
          mode="inline"
          style={{
            background: darkMode ? '#1a1a1a' : '#ffffff',
            border: 'none',
          }}
          items={categoryItems.map(item => ({
            key: item.key,
            icon: <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>,
            label: item.label,
            style: {
              color: darkMode ? '#ffffff' : '#000000',
            },
          }))}
        />
        <Divider style={{ 
          borderColor: darkMode ? '#404040' : '#f0f0f0',
          margin: '0.5rem 0',
        }} />
        <div style={{ padding: '0.5rem 0' }}>
          <a href="#" style={{ 
            display: 'block', 
            padding: '0.75rem 1rem', 
            color: darkMode ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}>
            Recommends
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '0.75rem 1rem', 
            color: darkMode ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}>
            New arrivals
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '0.75rem 1rem', 
            color: darkMode ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}>
            Bestsellers
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '0.75rem 1rem', 
            color: darkMode ? '#ffffff' : '#000000',
            textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? '#2a2a2a' : '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}>
            Gift boxes
          </a>
        </div>
      </Drawer>

      <style>{`
        .desktop-only {
          display: flex !important;
        }
        .mobile-only {
          display: none !important;
        }
        .desktop-search {
          display: block !important;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .desktop-search {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;