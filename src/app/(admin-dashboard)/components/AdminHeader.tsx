'use client';

import React from 'react';
import { Layout, Input, Badge, Avatar, Space } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <>
      <AntHeader 
        style={{ 
          background: '#000000', 
          padding: '0 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '2px solid #FFD700',
          height: '64px'
        }}
      >
        <Input
          placeholder="Search"
          prefix={<SearchOutlined style={{ color: '#FFD700' }} />}
          style={{ width: 300 }}
          className="black-yellow-input"
        />
        <Space size="large" align="center">
          <Badge 
            count={5}
            style={{ backgroundColor: '#FFD700', color: '#000000', fontWeight: 600 }}
          >
            <BellOutlined style={{ fontSize: 20, color: '#FFD700' }} />
          </Badge>
          <Space align="center">
            <Avatar 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#FFD700', color: '#000000' }}
            />
            <span style={{ color: '#FFD700', fontWeight: 500 }}>My account</span>
          </Space>
        </Space>
      </AntHeader>

      <style jsx global>{`
        .black-yellow-input {
          background-color: #000000 !important;
        }
        .black-yellow-input .ant-input {
          background-color: #000000 !important;
          border: none !important;
          color: #FFD700 !important;
          transition: all 0.3s ease;
          box-shadow: none !important;
        }
        .black-yellow-input .ant-input::placeholder {
          color: #999999 !important;
        }
        .black-yellow-input .ant-input:hover,
        .black-yellow-input .ant-input:focus,
        .black-yellow-input .ant-input:active {
          background-color: #000000 !important;
          border: none !important;
          color: #FFD700 !important;
          box-shadow: none !important;
          outline: none !important;
        }
        .black-yellow-input .ant-input-affix-wrapper {
          background-color: #000000 !important;
          border: 1px solid #FFD700 !important;
          transition: all 0.3s ease;
        }
        .black-yellow-input .ant-input-affix-wrapper:hover,
        .black-yellow-input .ant-input-affix-wrapper:focus,
        .black-yellow-input .ant-input-affix-wrapper:focus-within,
        .black-yellow-input .ant-input-affix-wrapper-focused,
        .black-yellow-input .ant-input-affix-wrapper:active {
          background-color: #000000 !important;
          border: 1px solid #FFD700 !important;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3) !important;
          outline: none !important;
        }
        .black-yellow-input .ant-input-affix-wrapper:hover .ant-input,
        .black-yellow-input .ant-input-affix-wrapper-focused .ant-input,
        .black-yellow-input .ant-input-affix-wrapper:focus-within .ant-input {
          background-color: #000000 !important;
          color: #FFD700 !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
      `}</style>
    </>
  );
}