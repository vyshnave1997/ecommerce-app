// app/auth/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Import login function dynamically
      const { login } = await import('../../../utils/auth');
      const result = login(values.email, values.password);
      
      if (result.success) {
        message.success('Login successful!');
        // Redirect based on role
        router.push(result.redirectTo || '/');
      } else {
        message.error(result.error || 'Invalid credentials');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    message.info('Google Sign-In coming soon!');
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
        padding: '20px 15px'
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
            Welcome back
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '32px'
          }}>
            Please enter your details
          </p>

          {/* Google Sign In Button */}
          <Button
            icon={<GoogleOutlined />}
            block
            size="large"
            onClick={handleGoogleLogin}
            style={{
              height: '48px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '15px',
              border: '1px solid #d9d9d9'
            }}
          >
            Sign in with Google
          </Button>

          <Divider style={{ margin: '24px 0', color: '#999' }}>
            or
          </Divider>

          {/* Login Form */}
          <Form
            name="login"
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

            <Form.Item
              label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Enter your password"
                size="large"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <Form.Item
                name="remember"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Checkbox style={{ fontSize: '14px' }}>
                  Remember for 30 days
                </Checkbox>
              </Form.Item>

              <Link 
                href="/auth/forgot-password"
                style={{
                  fontSize: '14px',
                  color: '#667eea',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Forgot password
              </Link>
            </div>

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
                Sign in
              </Button>
            </Form.Item>
          </Form>

          {/* Sign Up Link */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666666'
          }}>
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              style={{
                color: '#667eea',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Sign up
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
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000"
            alt="Fashion"
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
              Bring your ideas to life.
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6
            }}>
              Sign up for free and enjoy access to all features for 30 days. No credit card required.
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

export default LoginPage;