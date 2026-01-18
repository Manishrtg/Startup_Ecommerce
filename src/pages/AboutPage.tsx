import { Award, Heart, Leaf, MapPin, Target, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Pure Angan Organic
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              From the fields of Bihar to serving businesses across India and globally, we bring you
              certified organic products rooted in tradition and powered by quality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Pure Angan Organic was founded with a simple yet powerful vision: to make authentic,
                  certified organic products accessible to businesses across India and beyond. What
                  started as a passion for organic farming has grown into a trusted B2B supplier
                  serving diverse industries.
                </p>
                <p>
                  Based in New Delhi, we operate production facilities in Bhagalpur, Bihar, and
                  Jaipur, Rajasthan, where we produce premium vermicompost and organic jaggery.
                  Through strategic partnerships with certified organic farmers and producers, we
                  ensure a consistent supply of high-quality products.
                </p>
                <p>
                  Every product that bears the Pure Angan name undergoes rigorous lab testing and
                  meets the highest certification standards. We don't just supply organic products—we
                  deliver trust, quality, and sustainability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="text-green-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Organic</h3>
                <p className="text-sm text-gray-600">All products certified and lab-tested</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-amber-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Certified</h3>
                <p className="text-sm text-gray-600">FSSAI, NPOP, Jaivik Bharat</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pan-India</h3>
                <p className="text-sm text-gray-600">Serving businesses nationwide</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-purple-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">B2B Focus</h3>
                <p className="text-sm text-gray-600">Bulk and wholesale supply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 text-white flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Founder</h3>
                  <p className="text-green-100">Meet the visionary</p>
                </div>
                <div className="md:col-span-2 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Manish Kumar</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Manish Kumar founded Pure Angan Organic with a mission to bridge the gap between
                    organic farmers and businesses seeking authentic, certified organic products. With
                    deep roots in Bihar's agricultural heritage and a modern business approach, he has
                    built Pure Angan into a trusted name in the organic B2B sector.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Under his leadership, Pure Angan has established production facilities, formed
                    partnerships with certified organic producers, and expanded operations to serve
                    both domestic and international markets. His commitment to quality, transparency,
                    and sustainability drives every aspect of the business.
                  </p>
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-green-600" />
                      <span>New Delhi, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide businesses with certified organic products that are responsibly sourced,
                rigorously tested, and delivered with reliability. We aim to be India's most trusted
                organic B2B supplier.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To expand Pure Angan Organic as a leading global supplier of Indian organic products,
                bringing the best of India's organic agriculture to businesses worldwide while
                supporting sustainable farming practices.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Quality without compromise</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Transparency in sourcing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Sustainable practices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Customer partnership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Production Network
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic production facilities ensuring quality and consistent supply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delhi Headquarters</h3>
              <p className="text-gray-600">
                Logistics hub and business operations center serving nationwide and international
                clients
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-amber-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bhagalpur Unit</h3>
              <p className="text-gray-600">
                Vermicompost production facility in Bihar, producing premium organic fertilizer
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jaipur Unit</h3>
              <p className="text-gray-600">
                Production facility in Rajasthan for vermicompost and organic products
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with Pure Angan Organic</h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join our growing network of businesses who trust us for their organic product needs. Let's
            grow together.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-all inline-flex items-center space-x-2 text-lg"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </section>
    </div>
  );
}
