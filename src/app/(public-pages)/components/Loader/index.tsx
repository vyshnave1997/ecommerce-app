import React, { useEffect, useState } from 'react';
import { theme } from 'antd';

interface LoaderProps {
  onLoadComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const { token } = theme.useToken();
  const [mounted, setMounted] = useState(false);
  
  // Detect dark mode
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';

  useEffect(() => {
    setMounted(true);
    
    // Call onLoadComplete after 3 seconds
    const timer = setTimeout(() => {
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
      zIndex: 9999,
    }}>
      {/* Loader Container */}
      <div style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        {/* Animated Circles */}
        <div style={{
          position: 'relative',
          width: '100px',
          height: '100px',
        }}>
          {/* Outer Ring */}
          <div className="loader-ring loader-ring-1" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: isDarkMode 
              ? '4px solid transparent'
              : '4px solid #e5e7eb',
            borderTopColor: isDarkMode ? '#8b5cf6' : '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1.5s linear infinite',
          }} />
          
          {/* Middle Ring */}
          <div className="loader-ring loader-ring-2" style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            border: isDarkMode 
              ? '4px solid transparent'
              : '4px solid #e5e7eb',
            borderTopColor: isDarkMode ? '#ec4899' : '#8b5cf6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite reverse',
          }} />
          
          {/* Inner Ring */}
          <div className="loader-ring loader-ring-3" style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '40%',
            height: '40%',
            border: isDarkMode 
              ? '4px solid transparent'
              : '4px solid #e5e7eb',
            borderTopColor: isDarkMode ? '#3b82f6' : '#ec4899',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }} />
        </div>

        {/* Loading Text */}
        <div style={{
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: isDarkMode ? token.colorTextHeading : '#1f2937',
            marginBottom: '0.5rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            Loading...
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: isDarkMode ? token.colorTextSecondary : '#6b7280',
          }}>
            Please wait
          </p>
        </div>

        {/* Gradient Background Blur (Dark Mode Only) */}
        {isDarkMode && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: -1,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;