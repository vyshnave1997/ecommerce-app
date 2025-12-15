// app/auth/otp/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Countdown timer for resend
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      message.error('Please enter complete OTP code');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Import verifyOTP function dynamically
      const { verifyOTP } = await import('../../../utils/auth');
      const result = verifyOTP(otpCode);
      
      if (result.success) {
        message.success('Verification successful!');
        router.push(result.redirectTo || '/');
      } else {
        message.error(result.error || 'Invalid OTP');
      }
    } catch (error) {
      message.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('OTP sent successfully!');
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      message.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Left Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px'
        }}>
          {/* Logo */}
          <div style={{
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#ffffff',
              }}>
                V
              </div>
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#000000'
              }}>
                VIKI<span style={{ color: '#667eea' }}>STORE</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            Verify your email
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            We've sent a verification code to<br />
            <strong style={{ color: '#000000' }}>your.email@example.com</strong>
          </p>

          {/* OTP Input */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            justifyContent: 'center'
          }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                style={{
                  width: '56px',
                  height: '64px',
                  fontSize: '24px',
                  fontWeight: 600,
                  textAlign: 'center',
                  border: '2px solid #d9d9d9',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d9d9d9';
                }}
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            onClick={handleVerify}
            style={{
              height: '48px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              backgroundColor: '#000000',
              border: 'none',
              marginBottom: '24px'
            }}
          >
            Verify email
          </Button>

          {/* Resend Code */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666666',
            marginBottom: '32px'
          }}>
            Didn't receive the code?{' '}
            {resendTimer > 0 ? (
              <span style={{ color: '#999999' }}>
                Resend in {resendTimer}s
              </span>
            ) : (
              <a
                onClick={handleResend}
                style={{
                  color: '#667eea',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Resend code
              </a>
            )}
          </div>

          {/* Back to Login */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px'
          }}>
            <Link
              href="/auth/login"
              style={{
                color: '#667eea',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div style={{
        flex: 1,
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '80%',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000"
            alt="Verification"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '12px',
              color: 'white'
            }}>
              Secure verification
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6
            }}>
              We take your security seriously. Verify your email to complete your registration.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="flex: 1"] {
            display: none;
          }
          div[style*="flex: 1"]:first-child {
            display: flex;
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default OTPPage;