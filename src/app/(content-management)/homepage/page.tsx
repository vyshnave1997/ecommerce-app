// app/(cms)/page.tsx - HOMEPAGE EDITOR (Main CMS Page)
'use client';

import { useState } from 'react';
import { Save, Eye, Upload, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';

export default function CMSHomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preview, setPreview] = useState(false);

  const [heroData, setHeroData] = useState({
    title: 'Welcome to Our Platform',
    subtitle: 'Build amazing experiences with our powerful tools',
    ctaText: 'Get Started',
    ctaLink: '/signup',
    backgroundImage: '',
    overlayOpacity: 50,
  });

  const [features, setFeatures] = useState([
    { id: 1, title: 'Fast Performance', description: 'Lightning-fast load times', icon: '⚡' },
    { id: 2, title: 'Secure', description: 'Enterprise-grade security', icon: '🔒' },
    { id: 3, title: 'Scalable', description: 'Grows with your business', icon: '📈' },
  ]);

  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'John Doe', role: 'CEO, Company', quote: 'This platform changed everything!', avatar: '' },
    { id: 2, name: 'Jane Smith', role: 'Designer', quote: 'Absolutely love the experience.', avatar: '' },
  ]);

  const [ctaData, setCtaData] = useState({
    heading: 'Ready to get started?',
    description: 'Join thousands of satisfied customers today',
    buttonText: 'Start Free Trial',
    buttonLink: '/signup',
  });

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'Call to Action' },
  ];

  const handleSave = () => {
    alert('Homepage saved successfully!');
  };

  const addFeature = () => {
    const newFeature = {
      id: Date.now(),
      title: 'New Feature',
      description: 'Feature description',
      icon: '✨',
    };
    setFeatures([...features, newFeature]);
  };

  const deleteFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: 'Customer Name',
      role: 'Role, Company',
      quote: 'Your testimonial here',
      avatar: '',
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateFeature = (id: number, field: string, value: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const updateTestimonial = (id: number, field: string, value: string) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Homepage Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Customize your homepage sections</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                {preview ? 'Edit Mode' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>

        {!preview ? (
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Sections</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {activeSection === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={heroData.title}
                      onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <textarea
                      value={heroData.subtitle}
                      onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={heroData.ctaText}
                        onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                      <input
                        type="text"
                        value={heroData.ctaLink}
                        onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heroData.backgroundImage}
                        onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overlay Opacity: {heroData.overlayOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={heroData.overlayOpacity}
                      onChange={(e) => setHeroData({ ...heroData, overlayOpacity: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {activeSection === 'features' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Features Section</h2>
                    <button
                      onClick={addFeature}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={feature.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature.icon}
                              onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                              className="w-12 text-center text-2xl border-0 bg-transparent"
                            />
                            <span className="font-medium text-gray-900">Feature {index + 1}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-red-600 hover:text-red-800" onClick={() => deleteFeature(feature.id)}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                            placeholder="Feature title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                            placeholder="Description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Testimonials Section</h2>
                    <button
                      onClick={addTestimonial}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Testimonial
                    </button>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className="font-medium text-gray-900">Testimonial {index + 1}</span>
                          <button
                            onClick={() => deleteTestimonial(testimonial.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                            placeholder="Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={testimonial.role}
                            onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                            placeholder="Role/Company"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <textarea
                            value={testimonial.quote}
                            onChange={(e) => updateTestimonial(testimonial.id, 'quote', e.target.value)}
                            placeholder="Testimonial quote"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'cta' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Call to Action Section</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Heading</label>
                      <input
                        type="text"
                        value={ctaData.heading}
                        onChange={(e) => setCtaData({ ...ctaData, heading: e.target.value })}
                        placeholder="CTA Heading"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={ctaData.description}
                        onChange={(e) => setCtaData({ ...ctaData, description: e.target.value })}
                        placeholder="CTA Description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                        <input
                          type="text"
                          value={ctaData.buttonText}
                          onChange={(e) => setCtaData({ ...ctaData, buttonText: e.target.value })}
                          placeholder="Button Text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                        <input
                          type="text"
                          value={ctaData.buttonLink}
                          onChange={(e) => setCtaData({ ...ctaData, buttonLink: e.target.value })}
                          placeholder="Button Link"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Preview Mode */}
            <div className="space-y-12">
              {/* Hero Preview */}
              <div
                className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: '#1e40af',
                  backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: heroData.overlayOpacity / 100 }}
                />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                  <h1 className="text-5xl font-bold mb-4">{heroData.title}</h1>
                  <p className="text-xl mb-8">{heroData.subtitle}</p>
                  <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
                    {heroData.ctaText}
                  </button>
                </div>
              </div>

              {/* Features Preview */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                <div className="grid grid-cols-3 gap-6">
                  {features.map((feature) => (
                    <div key={feature.id} className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Preview */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                <div className="grid grid-cols-2 gap-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-xs text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Preview */}
              <div className="bg-blue-600 rounded-lg p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">{ctaData.heading}</h2>
                <p className="text-xl mb-8">{ctaData.description}</p>
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
                  {ctaData.buttonText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}