import { useEffect, useState } from 'react';
import { ArrowRight, Award, Globe, Package, Users, Star, TrendingUp } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import ReviewsSection from '../components/ReviewsSection';

interface HomePageProps {
  onNavigate: (page: string, productSlug?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [flagshipProducts, setFlagshipProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) {
      setAllProducts(data);
      setFlagshipProducts(data.filter((p) => p.is_flagship));
    }
  };

  const features = [
    {
      icon: Package,
      title: 'In-house Production',
      description: 'Own production facilities in Bhagalpur and Jaipur ensuring quality control',
    },
    {
      icon: Award,
      title: 'Certified Products',
      description: 'FSSAI, NPOP, Jaivik Bharat certified with complete lab testing',
    },
    {
      icon: Globe,
      title: 'Export-Ready',
      description: 'Serving international markets including USA, UAE, UK, and more',
    },
    {
      icon: Users,
      title: 'White Label Options',
      description: 'Customizable packaging and branding for your business needs',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-green-50 via-amber-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                Certified Organic Since Inception
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                India's Purest Organic Goods —{' '}
                <span className="text-green-700">From Our Angan to the World</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Premium certified organic products for B2B buyers. Bulk supply, white labeling, and
                export-ready solutions from Delhi to global markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Request Bulk Quote</span>
                  <ArrowRight size={20} />
                </button>
                <a
                  href="https://wa.me/919358303029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-lg font-medium hover:bg-green-50 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <Package className="text-green-600" size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">6+ Products</h3>
                    <p className="text-sm text-gray-600">Premium organic range</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <Award className="text-amber-600" size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">100% Certified</h3>
                    <p className="text-sm text-gray-600">FSSAI & Organic certified</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <Globe className="text-blue-600" size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Export Ready</h3>
                    <p className="text-sm text-gray-600">Serving global markets</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <Users className="text-purple-600" size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">White Label</h3>
                    <p className="text-sm text-gray-600">Custom branding available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-green-600" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {flagshipProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <TrendingUp size={20} />
                <span className="text-sm font-medium">OUR FLAGSHIP PRODUCTS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Premium Vermicompost & Earthworms
              </h2>
              <p className="text-xl text-green-50 max-w-3xl mx-auto">
                Our most popular products, trusted by organic farmers, nurseries, and agricultural
                businesses across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {flagshipProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                  onClick={() => onNavigate('product', product.slug)}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center relative">
                    <Package className="text-green-600" size={80} />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      FLAGSHIP
                    </div>
                  </div>
                  <div className="p-6 text-gray-900">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.short_description}</p>

                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-3xl font-bold text-green-700">
                          {product.price_from
                            ? `₹${product.price_from.toLocaleString('en-IN')}`
                            : 'Custom'}
                        </span>
                        {product.price_unit && (
                          <span className="text-gray-600">{product.price_unit}</span>
                        )}
                      </div>
                      {product.slug === 'vermicompost' && (
                        <p className="text-sm text-gray-600 font-medium">
                          Available in: 1kg, 2kg, 5kg, 10kg, 50kg
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.certifications.slice(0, 3).map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('product', product.slug);
                      }}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>View Details & Order</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Product Range with Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our full catalog of certified organic products for bulk orders, white labeling,
              and export
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => onNavigate('product', product.slug)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
                  <Package
                    className="text-green-600 group-hover:scale-110 transition-transform"
                    size={64}
                  />
                  {product.is_flagship && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-xs flex items-center space-x-1">
                      <Star size={12} className="fill-white" />
                      <span>FLAGSHIP</span>
                    </div>
                  )}
                  {product.is_seasonal && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      SEASONAL
                    </div>
                  )}
                  {product.white_label_available && !product.is_flagship && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      White Label
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.short_description}
                  </p>

                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-green-700">
                        {product.price_from
                          ? `₹${product.price_from.toLocaleString('en-IN')}`
                          : 'Price on Request'}
                      </span>
                      {product.price_unit && (
                        <span className="text-sm text-gray-600">{product.price_unit}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('product', product.slug);
                    }}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Partner with India's Trusted Organic Supplier?
              </h2>
              <p className="text-lg text-green-50 mb-8 leading-relaxed">
                Join hundreds of businesses across India and globally who trust Pure Angan Organic
                for their organic product needs. Bulk orders, custom packaging, and reliable
                delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-all inline-flex items-center justify-center space-x-2"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={20} />
                </button>
                <a
                  href="https://wa.me/919358303029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-600 text-white border-2 border-white rounded-lg font-medium hover:bg-green-500 transition-all inline-flex items-center justify-center space-x-2"
                >
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2+</div>
                  <div className="text-green-100 text-sm">Production Units</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-green-100 text-sm">Organic Certified</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">6+</div>
                  <div className="text-green-100 text-sm">Product Range</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-green-100 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
