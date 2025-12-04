import React from 'react';
import { theme } from 'antd';

const Footer = () => {
  const { token } = theme.useToken();
  
  // Detect dark mode
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';
  
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Investors', 'Careers', 'Blogs and news', 'Example']
    },
    {
      title: 'Buyers',
      links: ['Find store', 'Registration', 'Partnerships', 'Gift vouchers', 'Example']
    },
    {
      title: 'Help',
      links: ['Contact us', 'Live chat', 'Documentation', 'Download', 'Versions']
    },
    {
      title: 'Service',
      links: ['Safe purchase', 'Logistics service', 'Refund', 'Example link', 'Something']
    },
    {
      title: 'Language',
      links: ['Español', 'Português', 'Deutsch', '日本語']
    }
  ];

  return (
    <footer style={{
      backgroundColor: isDarkMode ? token.colorBgContainer : '#f5f5f5',
      borderTop: `1px solid ${token.colorBorder}`,
      padding: '48px 24px 24px',
      marginTop: '80px'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto' 
      }}>
        {/* Footer Links Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '32px',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: isDarkMode ? token.colorTextHeading : '#1a1a1a'
              }}>
                {section.title}
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '12px' }}>
                    <a 
                      href="#" 
                      style={{ 
                        color: isDarkMode ? token.colorTextSecondary : '#666666',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = token.colorPrimary}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = isDarkMode ? token.colorTextSecondary : '#666666'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: token.colorBorder,
          margin: '32px 0'
        }} />

        {/* Copyright */}
        <div style={{ 
          textAlign: 'center',
          color: isDarkMode ? token.colorTextSecondary : '#666666',
          fontSize: '14px'
        }}>
          © {new Date().getFullYear()} Brandname. All rights reserved.
        </div>
      </div>

      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 1024px) {
          footer > div > div:first-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;