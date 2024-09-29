import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Icon for carousel

interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  image?: string; // Optional if not always needed
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-r from-gray-900 to-black bg-opacity-90 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 max-w-5xl w-full h-full overflow-hidden relative shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800 focus:outline-none transition duration-300"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Product Image Carousel */}
          <div className="md:w-1/2 relative h-96 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Navigation */}
            <button
              className="absolute left-4 top-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transform -translate-y-1/2 shadow-lg"
              onClick={prevImage}
            >
              <FaArrowLeft size={18} />
            </button>
            <button
              className="absolute right-4 top-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transform -translate-y-1/2 shadow-lg"
              onClick={nextImage}
            >
              <FaArrowRight size={18} />
            </button>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 md:pl-10 mt-4 md:mt-0 flex flex-col justify-start">
            <h2 className="text-4xl font-extrabold text-gray-800">{product.name}</h2>
            <div className="flex items-center mt-3">
              <p className="text-2xl font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
              <p className="text-lg text-gray-500 line-through ml-4">₹{product.originalPrice.toFixed(2)}</p>
              <span className="ml-3 bg-green-600 text-white px-3 py-1 text-sm rounded-md">
                {discountPercentage}% off
              </span>
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

            <button
              className="mt-8 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-300"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;


