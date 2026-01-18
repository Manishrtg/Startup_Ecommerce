import { useEffect, useState } from 'react';
import { ArrowRight, Package, Star } from 'lucide-react';
import { supabase, Product, Category } from '../lib/supabase';

interface ProductsPageProps {
  onNavigate: (page: string, productSlug?: string) => void;
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) {
      setCategories(data);
    }
  };

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('display_order', { ascending: true });

    if (data) {
      setProducts(data);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Premium certified organic products for bulk orders, white labeling, and export. All
              products are lab-tested and meet the highest quality standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => onNavigate('product', product.slug)}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
                    <Package className="text-green-600 group-hover:scale-110 transition-transform" size={64} />
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
          )}
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Choosing the Right Products?
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Our team is ready to assist you with bulk orders, custom packaging, and export inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Request Quote</span>
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
      </section>
    </div>
  );
}
