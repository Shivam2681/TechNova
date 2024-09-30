import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg overflow-hidden cursor-pointer my-5 mx-2 hover:shadow-2xl transition-all duration-300 ease-in-out"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="relative w-full pb-[75%]"> {/* 4:3 aspect ratio */}
        <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-br-lg z-10">
          {discountPercentage}% OFF
        </div>
        <motion.div 
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={product.image || product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </motion.div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 truncate">{product.name}</h2>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-2xl font-bold text-green-400">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
          </div>
          {/* {product.rating !== undefined && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm">{product.rating.toFixed(1)}</span>
            </div>
          )} */}
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        <motion.button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;