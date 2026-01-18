import { useState } from 'react';
import { Award, CheckCircle, Globe, Package, Plane, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ExportPageProps {
  onNavigate: (page: string) => void;
}

export default function ExportPage({ onNavigate }: ExportPageProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('inquiries').insert({
      inquiry_type: 'export',
      company_name: formData.companyName,
      contact_person: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      message: formData.message,
    });

    if (!error) {
      setSubmitSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        message: '',
      });
      setTimeout(() => {
        setShowInquiryForm(false);
        setSubmitSuccess(false);
      }, 3000);
    }

    setIsSubmitting(false);
  };

  const certifications = [
    {
      icon: Award,
      name: 'FSSAI Certified',
      description: 'Food Safety and Standards Authority of India certification',
    },
    {
      icon: Shield,
      name: 'NPOP Certified',
      description: 'National Programme for Organic Production',
    },
    {
      icon: CheckCircle,
      name: 'Jaivik Bharat',
      description: 'Government of India organic certification',
    },
    {
      icon: Award,
      name: 'Lab Tested',
      description: 'Complete lab reports for A2 Desi Cow Ghee and all products',
    },
  ];

  const exportMarkets = [
    { region: 'North America', countries: ['USA', 'Canada'] },
    { region: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'] },
    { region: 'Europe', countries: ['UK', 'Germany', 'France', 'Netherlands'] },
    { region: 'Asia Pacific', countries: ['Singapore', 'Malaysia', 'Australia'] },
  ];

  const exportCapabilities = [
    'Complete export documentation support',
    'Compliance with international food safety standards',
    'Custom packaging for international markets',
    'Container and LCL shipments',
    'Competitive FOB and CIF pricing',
    'Quality assurance and inspection reports',
    'Flexible payment terms for regular buyers',
    'Dedicated export team',
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Export Services
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Taking <span className="text-blue-600">India's Organic Excellence</span> to the World
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Export-ready certified organic products with complete documentation, international
                compliance, and reliable logistics support for B2B buyers worldwide.
              </p>
              <button
                onClick={() => setShowInquiryForm(true)}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all inline-flex items-center space-x-2"
              >
                <Globe size={20} />
                <span>Request Export Quote</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <cert.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Global Reach
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Serving international markets with premium certified organic products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exportMarkets.map((market, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{market.region}</h3>
                <ul className="space-y-1">
                  {market.countries.map((country, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
              <p className="text-gray-700">
                <span className="font-bold text-blue-600">Expanding globally:</span> We are actively
                establishing partnerships in new markets and welcome inquiries from importers
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Export-Ready Products
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                All our products are certified for export and comply with international food safety
                standards. We provide complete documentation including certificates of origin, lab
                reports, and phytosanitary certificates where required.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-green-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">A2 Desi Cow Ghee</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Lab-tested premium ghee with complete export documentation
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          FSSAI Certified
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Lab Reports
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-amber-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">Organic Jaggery</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Premium organic jaggery in multiple formats
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Organic Certified
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Jaivik Bharat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-purple-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">Organic Makhana</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        High-quality fox nuts ready for international markets
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Export Quality
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Lab Tested
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('products')}
                className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                View All Products
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Export Capabilities</h3>
              <div className="space-y-3">
                {exportCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white/60 rounded-lg p-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why International Buyers Trust Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Quality Assurance</h4>
                      <p className="text-blue-50 text-sm">
                        Every shipment comes with complete lab reports and quality certificates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Plane size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Reliable Logistics</h4>
                      <p className="text-blue-50 text-sm">
                        Timely delivery with proper packaging and temperature control
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Complete Compliance</h4>
                      <p className="text-blue-50 text-sm">
                        All necessary export documentation and customs support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 text-gray-900">
                <h3 className="text-xl font-bold mb-6">Get Export Quote</h3>
                <p className="text-gray-600 mb-6">
                  Contact our export team for pricing, minimum order quantities, and shipping details
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Export Inquiry
                  </button>
                  <a
                    href="mailto:pureangan@gmail.com"
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    Email: pureangan@gmail.com
                  </a>
                  <a
                    href="tel:+919358303029"
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    Call: +91 9358303029
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Export Inquiry</h2>
              <p className="text-gray-600 mt-2">
                Please provide your details and our export team will contact you
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your export inquiry has been submitted. We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g., USA, UAE, UK"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify products, quantities, and any specific requirements..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
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
