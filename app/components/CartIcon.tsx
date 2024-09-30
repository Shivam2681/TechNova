import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6 text-white" />
      {itemCount > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
