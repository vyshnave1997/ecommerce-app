'use client';
import React, { useState } from 'react';
import { Card, Tabs, Input, Button, Upload, Space, Row, Col, InputNumber, message } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
  image: string | null;
}

interface BannerData {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
}

interface Deal {
  id: number;
  name: string;
  discount: string;
  image: string | null;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CMSPageManager(): JSX.Element {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'New trending',
    subtitle: 'Electronic items',
    buttonText: 'Learn more',
    backgroundColor: '#1890ff',
    image: null
  });

  const [bannerData, setBannerData] = useState<BannerData>({
    title: 'Get US $10 off',
    subtitle: 'for first order',
    buttonText: 'Get offer',
    backgroundColor: '#7c3aed'
  });

  const [deals, setDeals] = useState<Deal[]>([
    { id: 1, name: 'The Product name', discount: '-20%', image: null },
    { id: 2, name: 'The Product name', discount: '-5%', image: null },
    { id: 3, name: 'The Product name', discount: '-7%', image: null },
    { id: 4, name: 'The Product name', discount: '-50%', image: null },
    { id: 5, name: 'The Product name', discount: '-20%', image: null }
  ]);

  const [countdown, setCountdown] = useState<Countdown>({
    days: 4,
    hours: 12,
    minutes: 55,
    seconds: 57
  });

  const handleSave = (section: string): void => {
    message.success(`${section} saved successfully!`);
  };

  const addDeal = (): void => {
    const newDeal: Deal = {
      id: deals.length + 1,
      name: 'New Product',
      discount: '-0%',
      image: null
    };
    setDeals([...deals, newDeal]);
  };

  const updateDeal = (id: number, field: keyof Deal, value: string): void => {
    setDeals(deals.map(deal => 
      deal.id === id ? { ...deal, [field]: value } : deal
    ));
  };

  const deleteDeal = (id: number): void => {
    setDeals(deals.filter(deal => deal.id !== id));
  };

  const tabs = [
    {
      key: 'hero',
      label: <span style={{ color: '#FFD700' }}>Hero Section</span>,
      children: (
        <div>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Title</label>
                <Input
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Subtitle</label>
                <Input
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Button Text</label>
                <Input
                  value={heroData.buttonText}
                  onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Background Color</label>
                <Input
                  type="color"
                  value={heroData.backgroundColor}
                  onChange={(e) => setHeroData({ ...heroData, backgroundColor: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', height: '40px' }}
                />
              </div>
            </Col>
          </Row>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Hero Image</label>
            <Upload>
              <Button 
                icon={<UploadOutlined />}
                style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000000' }}
              >
                Upload Image
              </Button>
            </Upload>
          </div>

          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={() => handleSave('Hero Section')}
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000000', fontWeight: 600 }}
          >
            Save Hero Section
          </Button>
        </div>
      )
    },
    {
      key: 'deals',
      label: <span style={{ color: '#FFD700' }}>Deals & Offers</span>,
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card 
            title={<span style={{ color: '#FFD700' }}>Countdown Timer</span>}
            style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700' }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Days</label>
                  <InputNumber
                    value={countdown.days}
                    onChange={(value) => setCountdown({ ...countdown, days: value || 0 })}
                    style={{ width: '100%', backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Hours</label>
                  <InputNumber
                    value={countdown.hours}
                    onChange={(value) => setCountdown({ ...countdown, hours: value || 0 })}
                    style={{ width: '100%', backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Minutes</label>
                  <InputNumber
                    value={countdown.minutes}
                    onChange={(value) => setCountdown({ ...countdown, minutes: value || 0 })}
                    style={{ width: '100%', backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Seconds</label>
                  <InputNumber
                    value={countdown.seconds}
                    onChange={(value) => setCountdown({ ...countdown, seconds: value || 0 })}
                    style={{ width: '100%', backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                  />
                </div>
              </Col>
            </Row>
          </Card>

          {deals.map((deal) => (
            <Card
              key={deal.id}
              title={<span style={{ color: '#FFD700' }}>Deal #{deal.id}</span>}
              extra={
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => deleteDeal(deal.id)}
                  style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                >
                  Delete
                </Button>
              }
              style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700' }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Product Name</label>
                    <Input
                      value={deal.name}
                      onChange={(e) => updateDeal(deal.id, 'name', e.target.value)}
                      style={{ backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Discount</label>
                    <Input
                      value={deal.discount}
                      onChange={(e) => updateDeal(deal.id, 'discount', e.target.value)}
                      style={{ backgroundColor: '#1a1a1a', borderColor: '#FFD700', color: '#FFFFFF' }}
                    />
                  </div>
                </Col>
              </Row>
              <div style={{ marginTop: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Product Image</label>
                <Upload>
                  <Button 
                    icon={<UploadOutlined />}
                    style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000000' }}
                  >
                    Upload Image
                  </Button>
                </Upload>
              </div>
            </Card>
          ))}

          <Space>
            <Button 
              type="dashed" 
              icon={<PlusOutlined />}
              onClick={addDeal}
              style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFD700' }}
            >
              Add New Deal
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={() => handleSave('Deals Section')}
              style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000000', fontWeight: 600 }}
            >
              Save All Deals
            </Button>
          </Space>
        </Space>
      )
    },
    {
      key: 'banner',
      label: <span style={{ color: '#FFD700' }}>Promotional Banner</span>,
      children: (
        <div>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Title</label>
                <Input
                  value={bannerData.title}
                  onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Subtitle</label>
                <Input
                  value={bannerData.subtitle}
                  onChange={(e) => setBannerData({ ...bannerData, subtitle: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Button Text</label>
                <Input
                  value={bannerData.buttonText}
                  onChange={(e) => setBannerData({ ...bannerData, buttonText: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', color: '#FFFFFF' }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ color: '#FFD700', display: 'block', marginBottom: 4 }}>Background Color</label>
                <Input
                  type="color"
                  value={bannerData.backgroundColor}
                  onChange={(e) => setBannerData({ ...bannerData, backgroundColor: e.target.value })}
                  style={{ backgroundColor: '#2a2a2a', borderColor: '#FFD700', height: '40px' }}
                />
              </div>
            </Col>
          </Row>

          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={() => handleSave('Banner Section')}
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000000', fontWeight: 600 }}
          >
            Save Banner
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      padding: '24px' 
    }}>
      <Card 
        title={<span style={{ color: '#FFD700', fontSize: '24px', fontWeight: 'bold' }}>CMS - Content Management</span>}
        style={{ 
          backgroundColor: '#1a1a1a', 
          borderColor: '#FFD700',
          border: '2px solid #FFD700'
        }}
      >
        <Tabs 
          defaultActiveKey="hero"
          items={tabs}
          className="cms-tabs"
        />
      </Card>

      <style>{`
        .cms-tabs .ant-tabs-nav {
          background-color: #2a2a2a;
          padding: 8px;
          border-radius: 4px 4px 0 0;
        }
        .cms-tabs .ant-tabs-tab {
          color: #FFD700 !important;
          border-radius: 20px;
          margin: 0 4px;
          padding: 8px 20px !important;
        }
        .cms-tabs .ant-tabs-tab-active {
          background-color: #FFD700 !important;
          border-radius: 20px;
          padding: 8px 20px !important;
        }
        .cms-tabs .ant-tabs-tab-active .ant-tabs-tab-btn,
        .cms-tabs .ant-tabs-tab-active span {
          color: #000000 !important;
          font-weight: 600;
        }
        .cms-tabs .ant-tabs-ink-bar {
          background-color: #FFD700 !important;
        }
        .cms-tabs .ant-tabs-content {
          background-color: #1a1a1a;
          padding: 24px;
          border: 2px solid #FFD700;
          border-top: none;
        }
        .ant-input:hover,
        .ant-input:focus,
        .ant-input-number:hover,
        .ant-input-number:focus {
          border-color: #FFD700 !important;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.1) !important;
        }
        .ant-card-head {
          background-color: #2a2a2a;
          border-bottom: 2px solid #FFD700;
        }
        .ant-input-number-input {
          background-color: #1a1a1a !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}