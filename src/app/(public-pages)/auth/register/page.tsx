// app/auth/register/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Import register function dynamically
      const { register } = await import('../../../utils/auth');
      const result = register(values.name, values.email, values.password);
      
      if (result.success) {
        message.success('Registration successful! Please verify your email with OTP: 000000');
        router.push('/auth/otp');
      } else {
        message.error(result.error || 'Registration failed');
      }
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    message.info('Google Sign-Up coming soon!');
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
            Create an account
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '32px'
          }}>
            Start your journey with us today
          </p>

          {/* Google Sign Up Button */}
          <Button
            icon={<GoogleOutlined />}
            block
            size="large"
            onClick={handleGoogleSignup}
            style={{
              height: '48px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: '24px',
              border: '1px solid #d9d9d9'
            }}
          >
            Sign up with Google
          </Button>

          <Divider style={{ margin: '24px 0', color: '#999' }}>
            or
          </Divider>

          {/* Register Form */}
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Full name</span>}
              name="name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="Enter your full name"
                size="large"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

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
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Create a password"
                size="large"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Confirm password</span>}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Confirm your password"
                size="large"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms')),
                },
              ]}
              style={{ marginBottom: '24px' }}
            >
              <Checkbox style={{ fontSize: '13px', color: '#666' }}>
                I agree to the{' '}
                <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>
                  Privacy Policy
                </a>
              </Checkbox>
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
                Create account
              </Button>
            </Form.Item>
          </Form>

          {/* Sign In Link */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666666'
          }}>
            Already have an account?{' '}
            <Link
              href="/auth/login"
              style={{
                color: '#667eea',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Sign in
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
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000"
            alt="Shopping"
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
              Join our community
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6
            }}>
              Discover amazing products and exclusive deals. Get started with your free account today!
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

export default RegisterPage;