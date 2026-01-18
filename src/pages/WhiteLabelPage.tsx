import { useState } from 'react';
import {
  Award,
  CheckCircle,
  Package,
  Palette,
  Truck,
  Users,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WhiteLabelPageProps {
  onNavigate: (page: string) => void;
}

export default function WhiteLabelPage({ onNavigate }: WhiteLabelPageProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('inquiries').insert({
      inquiry_type: 'white_label',
      company_name: formData.companyName,
      contact_person: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (!error) {
      setSubmitSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => {
        setShowInquiryForm(false);
        setSubmitSuccess(false);
      }, 3000);
    }

    setIsSubmitting(false);
  };

  const steps = [
    {
      icon: Users,
      title: 'Initial Consultation',
      description:
        'Discuss your brand vision, target market, and specific product requirements with our team.',
    },
    {
      icon: Palette,
      title: 'Custom Design',
      description:
        'We help design packaging, labels, and branding elements that align with your brand identity.',
    },
    {
      icon: Package,
      title: 'Product Selection',
      description:
        'Choose from our range of certified organic products and customize packaging sizes.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description:
        'All products undergo rigorous testing and quality checks before packaging with your brand.',
    },
    {
      icon: Truck,
      title: 'Delivery',
      description:
        'Timely delivery of your white-labeled products ready for distribution to your customers.',
    },
  ];

  const benefits = [
    'No minimum order quantity for established partnerships',
    'Complete branding customization',
    'Multiple packaging size options',
    'All certifications and lab reports included',
    'Fast turnaround time',
    'Dedicated account manager',
    'Flexible payment terms for bulk orders',
    'Pan-India and international shipping',
  ];

  const industries = [
    {
      icon: Package,
      name: 'Retail Chains',
      description: 'Private label organic products for supermarkets and retail stores',
    },
    {
      icon: Users,
      name: 'Health Food Brands',
      description: 'White label organic foods for health and wellness companies',
    },
    {
      icon: Truck,
      name: 'E-commerce Businesses',
      description: 'Custom-branded organic products for online marketplaces',
    },
    {
      icon: Award,
      name: 'Export Companies',
      description: 'Certified organic products for international distribution',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                White Label Solutions
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Build Your Brand with Our{' '}
                <span className="text-amber-600">Certified Organic Products</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Launch your own organic product line without the complexity of production. We handle
                everything from sourcing to packaging, while you focus on growing your brand.
              </p>
              <button
                onClick={() => setShowInquiryForm(true)}
                className="px-8 py-4 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-all inline-flex items-center space-x-2"
              >
                <span>Start White Label Partnership</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="text-amber-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Custom Packaging</h3>
                <p className="text-sm text-gray-600">Your brand, your design</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-green-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Certified Quality</h3>
                <p className="text-sm text-gray-600">All certifications included</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Quick turnaround time</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-purple-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Dedicated Support</h3>
                <p className="text-sm text-gray-600">Personal account manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How White Labeling Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple 5-step process to launch your organic product line
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="text-amber-600" size={28} />
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-amber-200 hidden lg:block -z-10">
                    {index === steps.length - 1 && <div className="hidden"></div>}
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-sm font-bold text-amber-600 mb-2">STEP {index + 1}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Pure Angan for White Labeling?
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We understand that your brand identity is everything. That's why we offer complete
                flexibility and support to help you create products that truly represent your vision.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Available for White Labeling</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">A2 Desi Cow Ghee</h4>
                    <p className="text-sm text-gray-600">Multiple jar sizes available</p>
                  </div>
                  <button
                    onClick={() => onNavigate('product')}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Details
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">Organic Jaggery</h4>
                    <p className="text-sm text-gray-600">Blocks, powder, and cubes</p>
                  </div>
                  <button
                    onClick={() => onNavigate('product')}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Details
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">Organic Makhana</h4>
                    <p className="text-sm text-gray-600">Raw, roasted, and flavored</p>
                  </div>
                  <button
                    onClick={() => onNavigate('product')}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="w-full mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our white label solutions are trusted by diverse businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <industry.icon className="text-amber-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch Your Organic Product Line?
          </h2>
          <p className="text-xl text-amber-50 mb-8 leading-relaxed">
            Let's discuss how we can help bring your brand vision to life with our certified organic
            products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowInquiryForm(true)}
              className="px-8 py-4 bg-white text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Start Partnership</span>
              <ArrowRight size={20} />
            </button>
            <a
              href="https://wa.me/919358303029"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-500 text-white border-2 border-white rounded-lg font-medium hover:bg-amber-400 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Start White Label Partnership</h2>
              <p className="text-gray-600 mt-2">
                Tell us about your brand and we'll get back to you within 24 hours
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your inquiry has been submitted. Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your brand and requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What products are you interested in? What's your target market? Any specific packaging requirements?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
