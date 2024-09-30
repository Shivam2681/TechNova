"use client"
import React, { useState, useRef, useEffect } from 'react';
import CartIcon from './components/CartIcon';
import ProductShowcase from './components/ProductShowcase';
import { ShoppingCart, Search, Menu, ArrowDown, Star, Zap, Gift, TrendingUp, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X Pro",
    price: 999.99,
    originalPrice: 2099.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Experience the future of communication with the Smartphone X Pro, featuring cutting-edge technology and a stunning design."
  },
  {
    id: 2,
    name: "Laptop Z Ultra",
    price: 1299.99,
    originalPrice: 2999.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "The Laptop Z Ultra combines performance and portability, perfect for professionals and students alike."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    originalPrice: 499.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Immerse yourself in music with our Wireless Headphones, designed for comfort and superior sound quality."
  },
  {
    id: 4,
    name: "4K Action Camera",
    price: 399.99,
    originalPrice: 799.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Capture every adventure in stunning 4K resolution with our lightweight and durable Action Camera."
  },
  {
    id: 5,
    name: "Smartwatch Series 5",
    price: 249.99,
    originalPrice: 1099.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Stay connected and track your fitness goals with the Smartwatch Series 5, designed for your active lifestyle."
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 149.99,
    originalPrice: 599.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Take your music anywhere with our portable Bluetooth Speaker, offering exceptional sound quality and battery life."
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 89.99,
    originalPrice: 199.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Enhance your gaming experience with our high-precision Gaming Mouse, designed for performance and comfort."
  },
  {
    id: 8,
    name: "Portable SSD 1TB",
    price: 109.99,
    originalPrice: 299.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Store your data securely and access it at lightning speed with our Portable SSD."
  },
  {
    id: 9,
    name: "Wireless Charger",
    price: 49.99,
    originalPrice: 299.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Charge your devices effortlessly with our sleek and efficient Wireless Charger."
  }
  // Add more mock products here as needed
];

const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'}`}>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-80' : 'bg-transparent'} backdrop-filter backdrop-blur-lg py-5`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            className="text-white text-4xl font-bold "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TechNova
          </motion.h1>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-white hover:text-purple-300 transition-colors duration-300"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search onClick={toggleSearch} className="text-white hover:text-purple-300 cursor-pointer transition-colors duration-300" />
            </motion.div>
            <motion.div
              ref={cartIconRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CartIcon itemCount={cartItems.length} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button onClick={toggleDarkMode} className="text-white hover:text-purple-300 transition-colors duration-300 pt-1">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Menu className="text-white hover:text-purple-300 cursor-pointer transition-colors duration-300 md:hidden" />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center pt-24">
        {/* Hero Section */}
        <motion.div 
          className="text-center pt-20 pb-12 px-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-purple-500 to-pink-500'} opacity-20 animate-pulse`}></div>
            <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10"></div>
          </div>
          <div className="relative z-10">
            <motion.h2 
              className="text-white text-6xl font-extrabold mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Welcome to <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-pink-500 to-violet-500'}`}>TechNova</span>
            </motion.h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
              Discover cutting-edge technology that will transform your digital lifestyle.
            </p>
            <button 
              className={`${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600'} text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400`}
            >
              Explore Now
            </button>
          </div>
        </motion.div>

        {/* Featured Categories */}
        <motion.section
          className="w-full max-w-7xl px-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-white text-3xl font-bold mb-8 text-center">Featured Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Smartphones', 'Laptops', 'Audio', 'Accessories'].map((category, index) => (
              <motion.div
                key={category}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center cursor-pointer`}
                whileHover={{ scale: 1.05, backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(255, 255, 255, 0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">
                  {['📱', '💻', '🎧', '🔌'][index]}
                </div>
                <h4 className="text-white text-lg font-semibold">{category}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Special Offers */}
        <motion.section
          className="w-full max-w-7xl px-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-white text-3xl font-bold mb-8 text-center">Special Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Flash Sale", description: "Up to 50% off on selected items. Limited time only!" },
              { icon: Gift, title: "Free Gift", description: "Get a free gift with purchases over $500" },
              { icon: TrendingUp, title: "Trending Now", description: "See what's hot in tech right now" }
            ].map((offer, index) => (
              <motion.div
                key={index}
                className={`${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-purple-600 to-pink-600'} rounded-lg p-6 text-white`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <offer.icon className="w-12 h-12 mb-4" />
                <h4 className="text-xl font-semibold mb-2">{offer.title}</h4>
                <p>{offer.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section
          className="w-full max-w-7xl px-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} backdrop-filter backdrop-blur-lg rounded-lg p-8 text-center`}>
            <h3 className="text-white text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for exclusive deals and tech news</p>
            <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-white bg-opacity-20'} text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-auto`}
              />
              <button
                type="submit"
                className={`px-6 py-2 ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-md transition-colors duration-300 w-full md:w-auto`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>

        {/* Product Showcase */}
        <motion.div 
          className="w-full max-w-7xl px-4 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-pink-500 to-violet-500'} opacity-25 rounded-lg shadow-2xl transform z-0`}></div>
            <div className={`relative z-10 ${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8`}>
              <ProductShowcase products={mockProducts} onAddToCart={addToCart} cartIconRef={cartIconRef} />
            </div>
          </div>
        </motion.div>

        {/* Why TechNova Stands Out? */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-white text-3xl font-bold mb-6">Why TechNova Stands Out?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
            {[
              { icon: Star, title: "Top Quality", description: "We offer only the best products from trusted brands." },
              { icon: ShoppingCart, title: "Easy Shopping", description: "User-friendly interface for a smooth shopping experience." },
              { icon: ArrowDown, title: "Best Prices", description: "Competitive prices and regular discounts on our products." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} backdrop-filter backdrop-blur-lg rounded-lg p-6`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="text-purple-400 w-12 h-12 mx-auto mb-4" />
                <h4 className="text-white text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 mb-4">© 2024 TechNova. All rights reserved.</p>
          <p className="text-gray-400 mb-4">Stay connected with us</p>
          <div className="flex justify-center space-x-8 mb-6">
            {/* Social Icons */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;