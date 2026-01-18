import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PA</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Pure Angan Organic</h2>
                <p className="text-xs text-green-400">Certified Organic Products</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              India's trusted supplier of certified organic products. From our fields to your business,
              we deliver purity, quality, and sustainability.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/pure-angan-organic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/pureangan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('white-label')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  White Label Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('export')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">New Delhi, India</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+919358303029" className="text-sm hover:text-green-400 transition-colors">
                  +91 9358303029
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:pureangan@gmail.com"
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  pureangan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Pure Angan Organic. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Founded by Manish Kumar | Production Units: Bhagalpur (Bihar) & Jaipur (Rajasthan)
          </p>
        </div>
      </div>
    </footer>
  );
}
