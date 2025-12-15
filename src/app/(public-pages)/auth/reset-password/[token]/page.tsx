// app/auth/reset-password/[token]/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ResetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Reset password with token:', token);
      console.log('New password:', values.password);
      setResetSuccess(true);
      message.success('Password reset successful!');
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/auth/login');
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

          {!resetSuccess ? (
            <>
              {/* Title */}
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '8px',
                lineHeight: 1.2
              }}>
                Set new password
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                marginBottom: '32px',
                lineHeight: 1.6
              }}>
                Your new password must be different from previously used passwords.
              </p>

              {/* Form */}
              <Form
                name="reset-password"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  label={<span style={{ fontSize: '14px', fontWeight: 500 }}>New password</span>}
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your new password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' }
                  ]}
                  extra={
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      Must be at least 8 characters
                    </span>
                  }
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#999' }} />}
                    placeholder="Enter new password"
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
                    placeholder="Confirm new password"
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
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <CheckCircleOutlined style={{ fontSize: '32px', color: 'white' }} />
                </div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '8px',
                  lineHeight: 1.2
                }}>
                  Password reset
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  marginBottom: '32px',
                  lineHeight: 1.6
                }}>
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>

              <Button
                type="primary"
                block
                size="large"
                onClick={handleContinue}
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
                Continue to login
              </Button>
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
            src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000"
            alt="Security"
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
              Secure your account
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6
            }}>
              Choose a strong password to keep your account safe. We recommend using a combination of letters, numbers, and symbols.
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

export default ResetPasswordPage;