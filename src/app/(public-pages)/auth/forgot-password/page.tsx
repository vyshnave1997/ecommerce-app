// app/auth/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Forgot password email:', values.email);
      setEmailSent(true);
      message.success('Password reset link sent to your email!');
    } catch (error) {
      message.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
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

          {!emailSent ? (
            <>
              {/* Title */}
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '8px',
                lineHeight: 1.2
              }}>
                Forgot password?
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                marginBottom: '32px',
                lineHeight: 1.6
              }}>
                No worries, we'll send you reset instructions.
              </p>

              {/* Form */}
              <Form
                name="forgot-password"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Email address</span>}
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#999' }} />}
                    placeholder="Enter your email"
                    size="large"
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: '16px' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: 600,
                      backgroundColor: '#000000',
                      border: 'none'
                    }}
                  >
                    Reset password
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div style={{
                textAlign: 'center',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '32px'
                }}>
                  ✉️
                </div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '8px',
                  lineHeight: 1.2
                }}>
                  Check your email
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  marginBottom: '32px',
                  lineHeight: 1.6
                }}>
                  We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.
                </p>
              </div>

              <Button
                type="primary"
                block
                size="large"
                onClick={() => window.open('mailto:', '_blank')}
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  backgroundColor: '#000000',
                  border: 'none',
                  marginBottom: '16px'
                }}
              >
                Open email app
              </Button>

              <div style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#666666',
                marginBottom: '24px'
              }}>
                Didn't receive the email?{' '}
                <a
                  onClick={() => setEmailSent(false)}
                  style={{
                    color: '#667eea',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  Click to resend
                </a>
              </div>
            </>
          )}

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
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000"
            alt="Recovery"
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
              We've got you covered
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6
            }}>
              Forgot your password? No problem! We'll help you get back into your account quickly and securely.
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

export default ForgotPasswordPage;