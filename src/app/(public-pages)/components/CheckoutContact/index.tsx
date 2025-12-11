'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Input, 
  Checkbox, 
  Select, 
  Button, 
  Radio, 
  Space,
  Row,
  Col,
  theme,
  Typography
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface CheckoutContactProps {
  onContinue?: (formData: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  whatsapp: string;
  emailOffers: boolean;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  additionalComment: string;
  deliveryOption: 'pickup' | 'standard' | 'express';
}

const CheckoutContact: React.FC<CheckoutContactProps> = ({ onContinue }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [emailOffers, setEmailOffers] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [additionalComment, setAdditionalComment] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'standard' | 'express'>('pickup');

  const handleContinue = () => {
    // Basic validation
    if (!fullName || !phone) {
      alert('Please fill in all required fields');
      return;
    }

    const formData: CheckoutFormData = {
      fullName,
      phone,
      email,
      whatsapp,
      emailOffers,
      country,
      city,
      postalCode,
      address,
      additionalComment,
      deliveryOption,
    };

    if (onContinue) {
      onContinue(formData);
    }
  };

  return (
    <div>
      {/* Contact Information */}
      <Card
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          marginBottom: '24px',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={4} style={{ 
          color: token.colorTextHeading, 
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: 600
        }}>
          Contact information
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Full name
            </Text>
            <Input
              placeholder="Type here"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Phone
            </Text>
            <Input
              addonBefore="+1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Email <Text type="secondary">(optional)</Text>
            </Text>
            <Input
              placeholder="Type here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Whatsapp <Text type="secondary">(optional)</Text>
            </Text>
            <Input
              placeholder="Type here"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24}>
            <Checkbox
              checked={emailOffers}
              onChange={(e) => setEmailOffers(e.target.checked)}
              style={{ color: token.colorText }}
            >
              Email me weekly offers
            </Checkbox>
          </Col>
        </Row>
      </Card>

      {/* Shipping Address */}
      <Card
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          marginBottom: '24px',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={4} style={{ 
          color: token.colorTextHeading, 
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: 600
        }}>
          Shipping address
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Country
            </Text>
            <Select
              placeholder="Select country"
              value={country}
              onChange={setCountry}
              style={{ width: '100%' }}
              size="large"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'ae', label: 'United Arab Emirates' },
              ]}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              City
            </Text>
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Postal code
            </Text>
            <Input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Address
            </Text>
            <Input
              placeholder="Street name, district"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Location
            </Text>
            <Button
              block
              style={{
                height: '44px',
                borderRadius: '6px',
                backgroundColor: '#5f63f2',
                color: '#ffffff',
                border: 'none',
                fontWeight: 500,
              }}
            >
              Select location from map
            </Button>
          </Col>
          <Col xs={24}>
            <Text style={{ color: token.colorText, fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Additional comment
            </Text>
            <TextArea
              placeholder="Have something to say?"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              rows={4}
              style={{
                borderRadius: '6px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
                color: token.colorText,
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Delivery Options */}
      <Card
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          marginBottom: '24px',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={4} style={{ 
          color: token.colorTextHeading, 
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: 600
        }}>
          Choose delivery option
        </Title>

        <Radio.Group
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%', gap: '12px' }}>
            <Radio
              value="pickup"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: deliveryOption === 'pickup' ? '2px solid #5f63f2' : `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                color: token.colorText,
              }}
            >
              <div>
                <Text strong style={{ color: token.colorText }}>Self pick-up</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '13px' }}>From nearest location</Text>
              </div>
            </Radio>
            <Radio
              value="standard"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: deliveryOption === 'standard' ? '2px solid #5f63f2' : `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                color: token.colorText,
              }}
            >
              <div>
                <Text strong style={{ color: token.colorText }}>Standard</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '13px' }}>7-10 days after order</Text>
              </div>
            </Radio>
            <Radio
              value="express"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: deliveryOption === 'express' ? '2px solid #5f63f2' : `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                color: token.colorText,
              }}
            >
              <div>
                <Text strong style={{ color: token.colorText }}>Express</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '13px' }}>1-2 days after order</Text>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Card>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{
            height: '48px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 500,
            minWidth: '150px',
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
            border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
            color: token.colorText,
          }}
        >
          Back to Cart
        </Button>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={handleContinue}
          style={{
            height: '48px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            minWidth: '200px',
            backgroundColor: '#5f63f2',
            border: 'none',
          }}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default CheckoutContact;