"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import Image from 'next/image';
import { ArrowUpCircle, Tag } from 'lucide-react';
import { Product } from '../page';

interface ProductShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartIconRef: React.RefObject<HTMLDivElement>;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onAddToCart, cartIconRef }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [flyingImage, setFlyingImage] = useState<{ product: Product; position: { x: number; y: number } } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (showcaseRef.current) {
        setShowScrollTop(showcaseRef.current.scrollTop > 300);
      }
    };

    showcaseRef.current?.addEventListener('scroll', handleScroll);
    return () => showcaseRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: Product) => {
    onAddToCart(product);

    const addToCartButton = document.querySelector(`button[data-product-id="${product.id}"]`);
    if (addToCartButton) {
      const buttonRect = addToCartButton.getBoundingClientRect();
      const buttonPosition = {
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2
      };

      setFlyingImage({ product, position: buttonPosition });
      setTimeout(() => setFlyingImage(null), 1000);
    }
  };

  const scrollToTop = () => {
    showcaseRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
      <div ref={showcaseRef} className="container mx-auto px-4 h-screen overflow-y-auto relative">
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold mb-4">Our Top Products</h1>
          <div className="flex items-center justify-center">
            <Tag className="mr-2" size={24} />
            <p className="text-2xl">Huge Discounts Available!</p>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 50 }} 
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
            >
              <ProductCard product={product} onClick={() => openProductDetail(product)} />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={closeProductDetail}
              onAddToCart={() => {
                addToCart(selectedProduct);
                closeProductDetail();
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {flyingImage && cartIconRef.current && (
            <motion.div
              className="fixed w-16 h-16 z-50 pointer-events-none"
              initial={{ x: flyingImage.position.x - 32, y: flyingImage.position.y - 32, opacity: 0.8, scale: 1 }}
              animate={{ 
                x: cartIconRef.current.getBoundingClientRect().left + cartIconRef.current.getBoundingClientRect().width / 2 - 32,
                y: cartIconRef.current.getBoundingClientRect().top + cartIconRef.current.getBoundingClientRect().height / 2 - 32,
                opacity: 0,
                scale: 0.5
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image src={flyingImage.product.image || flyingImage.product.images[0]} alt={flyingImage.product.name} layout="fill" objectFit="contain" className="rounded-full shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 bg-white text-purple-600 p-3 rounded-full shadow-lg hover:bg-purple-100 transition-colors duration-200"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpCircle size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShowcase;

