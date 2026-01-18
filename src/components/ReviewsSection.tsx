import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase, Review } from '../lib/supabase';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_featured', true)
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

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied businesses across India and globally who trust Pure Angan
            Organic for their organic product needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 relative"
            >
              <div className="absolute top-6 right-6 text-green-100">
                <Quote size={48} />
              </div>

              <div className="flex items-center space-x-1 mb-4 relative z-10">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed relative z-10 line-clamp-4">
                {review.review_text}
              </p>

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

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                >
                  {String.fromCharCode(65 + i - 1)}
                </div>
              ))}
            </div>
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-green-700">500+</span> Happy Business Partners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
