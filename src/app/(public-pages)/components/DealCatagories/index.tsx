import React from 'react';
import Image from 'next/image';
import { Card, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

// Import background images - they're already strings
const bg1 = "/images/cat-bg1.jpg";
const bg2 = "/images/cate-bg2.jpg";

const { Title, Text } = Typography;

const DealsOffers = () => {
  const categories = [
    {
      title: "Home and outdoor items",
      background: bg1,
      products: [
        { name: "Garden Chair Set", price: "USD 89", image: "/images/pro1.jpg" },
        { name: "Outdoor BBQ Grill", price: "USD 199", image: "/images/pro2.jpg" },
        { name: "Patio Umbrella", price: "USD 49", image: "/images/pro3.jpg" },
        { name: "Lawn Mower", price: "USD 299", image: "/images/pro4.jpg" },
        { name: "Garden Tool Set", price: "USD 35", image: "/images/pro5.jpg" },
        { name: "Outdoor Fire Pit", price: "USD 129", image: "/images/pro6.jpg" },
        { name: "Hammock", price: "USD 69", image: "/images/pro7.jpg" },
        { name: "Plant Pots Set", price: "USD 25", image: "/images/pro8.jpg" }
      ]
    },
    {
      title: "Consumer electronics and gadgets",
      background: bg2,
      products: [
        { name: "Wireless Earbuds", price: "USD 99", image: "/images/pro9.jpg" },
        { name: "Smart Watch", price: "USD 199", image: "/images/pro10.jpg" },
        { name: "Portable Speaker", price: "USD 79", image: "/images/pro11.jpg" },
        { name: "Tablet", price: "USD 299", image: "/images/pro12.jpg" },
        { name: "Gaming Mouse", price: "USD 49", image: "/images/pro13.jpg" },
        { name: "Bluetooth Keyboard", price: "USD 89", image: "/images/pro14.jpg" },
        { name: "Power Bank", price: "USD 39", image: "/images/pro15.jpg" },
        { name: "Wireless Charger", price: "USD 25", image: "/images/pro16.jpg" }
      ]
    }
  ];

  return (
    <div className="pb-6 dark:bg-gray-900 space-y-8">

      {categories.map((category, index) => (
        <Card
          key={index}
          bordered={true}
          className="rounded-xl overflow-hidden shadow-md dark:shadow-lg 
          dark:bg-gray-800 dark:border-gray-700"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* LEFT CATEGORY BOX - FIXED BACKGROUND */}
            <div className="lg:w-1/4">
              <div
                className="h-full p-3 flex flex-col justify-center rounded-t-xl 
                lg:rounded-l-xl lg:rounded-t-none relative"
                style={{ 
                  minHeight: "136px",
                  backgroundImage: `url(${category.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>

                <div className="relative z-10 p-3 flex flex-col justify-center h-full">
                  <Title level={2} className="!m-0 !font-semibold !text-lg dark:text-white">
                    {category.title}
                  </Title>

                  <Button
                    type="default"
                    className="mt-2 bg-white dark:bg-gray-800 dark:text-white 
                    dark:border-gray-600 shadow-sm px-3 py-1 rounded-lg flex items-center gap-1 
                    hover:shadow-md transition text-sm"
                  >
                    Explore all <ArrowRightOutlined className="text-xs" />
                  </Button>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-3">

                {category.products.map((product, i) => (
                  <Card
                    key={i}
                    hoverable
                    bordered={true}
                    className="flex items-center rounded-lg border border-gray-300 
                    dark:border-gray-700 dark:bg-gray-800 
                    dark:hover:border-blue-500 shadow-sm hover:shadow-md transition"
                    style={{ minHeight: "122px" }}
                    bodyStyle={{
                      padding: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "6px",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <div className="flex flex-col flex-1">
                      <Text className="text-xs font-medium dark:text-white truncate">
                        {product.name}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400 text-xs">From</Text>
                      <Text className="text-sm font-semibold dark:text-white truncate">
                        {product.price}
                      </Text>
                    </div>

                    <div className="h-12 w-12 flex items-center justify-center relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-contain"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.onerror = null;
                          img.src = "/fallback.png";
                        }}
                      />
                    </div>

                  </Card>
                ))}

              </div>
            </div>

          </div>
        </Card>
      ))}

    </div>
  );
};

export default DealsOffers;