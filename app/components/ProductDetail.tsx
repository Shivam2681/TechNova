import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaStar } from 'react-icons/fa';

interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image?: string;
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      onAddToCart(product);
      setIsAddingToCart(false);
      alert('Product added to cart successfully');
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 bg-opacity-95 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-6xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.button
          className="absolute top-4 right-4 text-4xl text-gray-500 hover:text-gray-700 focus:outline-none z-10"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &times;
        </motion.button>

        {/* Product Image Carousel */}
        <div className="md:w-1/2 relative h-64 sm:h-80 md:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Image Navigation */}
          <motion.button
            className="absolute left-4 top-1/2 bg-white/80 text-gray-800 rounded-full p-2 sm:p-3 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white"
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ translateY: '-50%' }}
          >
            <FaArrowLeft size={16} />
          </motion.button>
          <motion.button
            className="absolute right-4 top-1/2 bg-white/80 text-gray-800 rounded-full p-2 sm:p-3 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white"
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ translateY: '-50%' }}
          >
            <FaArrowRight size={16} />
          </motion.button>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.name}
            </motion.h2>
            <motion.div 
              className="flex items-center mb-3 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} size={16} />
                ))}
              </div> */}
            </motion.div>
            <motion.div 
              className="flex items-center flex-wrap mb-3 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600">₹{product.price.toFixed(2)}</p>
              <p className="text-lg sm:text-xl text-gray-500 line-through ml-2 sm:ml-4">₹{product.originalPrice.toFixed(2)}</p>
              <span className="ml-2 sm:ml-4 bg-green-500 text-white px-2 py-1 text-xs sm:text-sm rounded-full">
                {discountPercentage}% off
              </span>
            </motion.div>
            <motion.p 
              className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {product.description}
            </motion.p>
          </div>
          <motion.button
            className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 sm:py-4 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none transition duration-300 flex items-center justify-center"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <motion.div
                className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
