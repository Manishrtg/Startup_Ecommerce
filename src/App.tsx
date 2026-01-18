import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WhiteLabelPage from './pages/WhiteLabelPage';
import ExportPage from './pages/ExportPage';
import ContactPage from './pages/ContactPage';

type Page = 'home' | 'about' | 'products' | 'product' | 'white-label' | 'export' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productSlug, setProductSlug] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page as Page);
    if (slug) {
      setProductSlug(slug);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'product':
        return <ProductDetailPage productSlug={productSlug} onNavigate={handleNavigate} />;
      case 'white-label':
        return <WhiteLabelPage onNavigate={handleNavigate} />;
      case 'export':
        return <ExportPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
