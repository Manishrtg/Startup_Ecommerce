import { useEffect, useState } from 'react';
import { ArrowLeft, Award, Package as PackageIcon, Tag, MessageCircle, Star, TrendingUp } from 'lucide-react';
import { supabase, Product, Review } from '../lib/supabase';

interface ProductDetailPageProps {
  productSlug: string;
  onNavigate: (page: string) => void;
}

export default function ProductDetailPage({ productSlug, onNavigate }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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

  useEffect(() => {
    loadProduct();
  }, [productSlug]);

  const loadProduct = async () => {
    const { data } = await supabase.from('products').select('*').eq('slug', productSlug).maybeSingle();

    if (data) {
      setProduct(data);
      loadReviews(data.id);
    }
  };

  const loadReviews = async (productId: string) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('review_date', { ascending: false });

    if (data) {
      setReviews(data);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
      />
    ));
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('inquiries').insert({
      inquiry_type: 'product',
      product_id: product?.id,
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

  const handleWhatsAppOrder = () => {
    const message = `Hi, I would like to order ${product?.name}. Please provide more details.`;
    window.open(`https://wa.me/919358303029?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <PackageIcon className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-gradient-to-br from-green-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <PackageIcon className="text-green-600" size={120} />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg flex items-center space-x-2"
                  >
                    <Award size={16} />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              {product.is_flagship && (
                <div className="mb-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg inline-flex items-center space-x-2 font-bold">
                  <TrendingUp size={20} />
                  <span>FLAGSHIP PRODUCT - MOST POPULAR</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                {product.white_label_available && (
                  <span className="px-4 py-2 bg-amber-100 text-amber-700 text-sm font-bold rounded-lg">
                    WHITE LABEL
                  </span>
                )}
              </div>

              {product.is_seasonal && (
                <div className="mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg inline-block">
                  <p className="text-amber-700 text-sm font-medium">
                    🌾 Seasonal Product - Availability may vary
                  </p>
                </div>
              )}

              <p className="text-xl text-gray-700 mb-4 leading-relaxed">{product.short_description}</p>

              <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-green-700">
                    {product.price_from
                      ? `₹${product.price_from.toLocaleString('en-IN')}`
                      : 'Contact for Price'}
                  </span>
                  {product.price_unit && (
                    <span className="text-lg text-gray-700">{product.price_unit}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Bulk orders and export pricing available</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.full_description}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <PackageIcon size={20} className="text-green-600" />
                  <span>Available Packaging Sizes</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.packaging_sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-white text-gray-700 text-sm border border-green-200 rounded-lg"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {product.white_label_available && (
                <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center space-x-2">
                    <Tag size={20} className="text-amber-600" />
                    <span>White Label Available</span>
                  </h3>
                  <p className="text-gray-700 text-sm">
                    This product is available for white labeling. We offer custom branding, packaging,
                    and label design to match your brand identity.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-lg"
                >
                  Request Quote
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-lg"
                >
                  <MessageCircle size={20} />
                  <span>Order on WhatsApp</span>
                </button>
                {product.white_label_available && (
                  <button
                    onClick={() => onNavigate('white-label')}
                    className="w-full px-6 py-4 bg-amber-100 text-amber-700 border-2 border-amber-300 rounded-lg font-medium hover:bg-amber-200 transition-colors"
                  >
                    Learn About White Labeling
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.review_text}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-gray-900">{review.customer_name}</p>
                    {review.customer_business && (
                      <p className="text-sm text-gray-600">{review.customer_business}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.review_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Request Quote for {product.name}</h2>
              <p className="text-gray-600 mt-2">
                Fill out the form below and we'll get back to you shortly
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your inquiry has been submitted. We'll contact you within 24 hours.
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
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
                      placeholder="Please specify quantity, delivery location, and any other requirements..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
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
