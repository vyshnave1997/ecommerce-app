import React, { useState } from 'react';
import { theme } from 'antd';

// BackgroundGradient Component
interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundGradient = ({ children, className = "" }: BackgroundGradientProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-sm"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

const SupplierQuoteForm = () => {
  const { token } = theme.useToken();
  
  const [formData, setFormData] = useState({
    item: '',
    details: '',
    quantity: '',
    unit: 'Litres'
  });

  // Detect dark mode by checking if background color is dark
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Inquiry sent successfully!');
  };

interface FormData {
    item: string;
    details: string;
    quantity: string;
    unit: string;
}

const handleChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
};

  // Generate 50 sine wave lines with large curves
  const generateWaveLines = () => {
    const lines = [];
    const totalLines = 40;
    
    for (let i = 0; i < totalLines; i++) {
      const yCenter = 400; // Center position
      const yOffset = (i - 25) * 10; // Spread from center
      const yPos = yCenter + yOffset;
      
      // Large amplitude for big curves
      const amplitude = 80 + (i % 20) * 4;
      
      // Wide wavelength for large, sweeping curves
      const wavelength = 600 + (i % 10) * 50;
      
      const duration = 12 + (i % 8);
      
      // Color selection
      let strokeColor;
      let strokeWidth;
      
      if (i < 15) {
        const colors = isDarkMode 
          ? ['rgb(59,130,246)', 'rgb(168,85,247)', 'rgb(236,72,153)', 'rgb(34,197,94)', 'rgb(251,191,36)']
          : ['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.22)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.18)', 'rgba(0,0,0,0.15)'];
        strokeColor = colors[i % colors.length];
        strokeWidth = 3.5 - (i * 0.15);
      } else if (i < 35) {
        const colors = isDarkMode
          ? ['rgb(14,165,233)', 'rgb(244,114,182)', 'rgb(132,204,22)', 'rgb(217,70,239)', 'rgb(99,102,241)']
          : ['rgba(0,0,0,0.14)', 'rgba(0,0,0,0.12)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.09)', 'rgba(0,0,0,0.08)'];
        strokeColor = colors[i % colors.length];
        strokeWidth = 2.5 - ((i - 15) * 0.08);
      } else {
        const colors = isDarkMode
          ? ['rgb(239,68,68)', 'rgb(251,191,36)', 'rgb(34,197,94)', 'rgb(168,85,247)']
          : ['rgba(0,0,0,0.07)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.04)'];
        strokeColor = colors[i % colors.length];
        strokeWidth = 1.8 - ((i - 35) * 0.06);
      }

      // Create large sine wave paths
      const path1 = `M0,${yPos} Q${wavelength/2},${yPos - amplitude} ${wavelength},${yPos} T${wavelength * 2},${yPos} ${wavelength * 3},${yPos}`;
      const path2 = `M0,${yPos} Q${wavelength/2},${yPos + amplitude} ${wavelength},${yPos} T${wavelength * 2},${yPos} ${wavelength * 3},${yPos}`;
      const path3 = `M0,${yPos} Q${wavelength/2},${yPos - amplitude * 0.7} ${wavelength},${yPos} T${wavelength * 2},${yPos} ${wavelength * 3},${yPos}`;

      lines.push(
        <path
          key={`wave-${i}`}
          stroke={strokeColor}
          strokeWidth={strokeWidth > 0.5 ? strokeWidth : 0.5}
          fill="none"
          d={path1}
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            dur={`${duration}s`}
            repeatCount="indefinite"
            values={`${path1};${path2};${path3};${path1}`}
          />
        </path>
      );
    }
    
    return lines;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ 
      backgroundColor: token.colorBgLayout,
      color: token.colorText
    }}>
      {/* Centered Wave Background - 50 lines only */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {generateWaveLines()}
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 min-h-screen gap-8 py-12">
        {/* Left Content - 60% */}
        <div className="flex-1 lg:w-3/5 max-w-2xl relative">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{
              color: token.colorTextHeading
            }}>
              An easy way to send requests to all suppliers
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{
              color: token.colorTextSecondary
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
        </div>

        {/* Right Form - 40% */}
        <div className="w-full lg:w-2/5 max-w-md relative z-10">
          {/* Form Card with Gradient Border (Dark Mode Only) */}
          {isDarkMode ? (
            <BackgroundGradient className="rounded-2xl p-[2px]">
              <div className="rounded-2xl shadow-2xl p-8 backdrop-blur-sm" style={{
                backgroundColor: token.colorBgContainer,
                boxShadow: token.boxShadow
              }}>
                <h2 className="text-2xl font-semibold mb-6" style={{
                  color: token.colorTextHeading
                }}>
                  Send quote to suppliers
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="What item you need?"
                      value={formData.item}
                      onChange={(e) => handleChange('item', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none transition"
                      style={{
                        backgroundColor: token.colorBgContainer,
                        borderColor: token.colorBorder,
                        color: token.colorText,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: token.borderRadius
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Type more details"
                      value={formData.details}
                      onChange={(e) => handleChange('details', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none transition resize-none"
                      style={{
                        backgroundColor: token.colorBgContainer,
                        borderColor: token.colorBorder,
                        color: token.colorText,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: token.borderRadius
                      }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg focus:outline-none transition"
                      style={{
                        backgroundColor: token.colorBgContainer,
                        borderColor: token.colorBorder,
                        color: token.colorText,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: token.borderRadius
                      }}
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => handleChange('unit', e.target.value)}
                      className="px-4 py-3 rounded-lg focus:outline-none transition cursor-pointer"
                      style={{
                        backgroundColor: token.colorBgContainer,
                        borderColor: token.colorBorder,
                        color: token.colorText,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: token.borderRadius
                      }}
                    >
                      <option>Litres</option>
                      <option>Kilograms</option>
                      <option>Pieces</option>
                      <option>Boxes</option>
                      <option>Meters</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: token.colorPrimary,
                      color: '#ffffff',
                      borderRadius: token.borderRadius
                    }}
                  >
                    Send inquiry
                  </button>
                </div>
              </div>
            </BackgroundGradient>
          ) : (
            <div className="rounded-2xl shadow-2xl p-8 backdrop-blur-sm" style={{
              backgroundColor: token.colorBgContainer,
              borderColor: token.colorBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: token.boxShadow
            }}>
              <h2 className="text-2xl font-semibold mb-6" style={{
                color: token.colorTextHeading
              }}>
                Send quote to suppliers
              </h2>
              
              <div className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="What item you need?"
                    value={formData.item}
                    onChange={(e) => handleChange('item', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition"
                    style={{
                      backgroundColor: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      color: token.colorText,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: token.borderRadius
                    }}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Type more details"
                    value={formData.details}
                    onChange={(e) => handleChange('details', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition resize-none"
                    style={{
                      backgroundColor: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      color: token.colorText,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: token.borderRadius
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg focus:outline-none transition"
                    style={{
                      backgroundColor: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      color: token.colorText,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: token.borderRadius
                    }}
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    className="px-4 py-3 rounded-lg focus:outline-none transition cursor-pointer"
                    style={{
                      backgroundColor: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      color: token.colorText,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: token.borderRadius
                    }}
                  >
                    <option>Litres</option>
                    <option>Kilograms</option>
                    <option>Pieces</option>
                    <option>Boxes</option>
                    <option>Meters</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: token.colorPrimary,
                    color: '#ffffff',
                    borderRadius: token.borderRadius
                  }}
                >
                  Send inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierQuoteForm;