"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import React, { useMemo } from "react";

type Props = {
  product: any;
};

const ProductQuantity = ({ product }: Props) => {
  const { items: cartItems, updateQuantity,addItem:addToCart } = useCart();
  const currentProductQuantity = useMemo(() =>
    cartItems.find((item) => item.id === product.id)?.quantity || 0,
    [cartItems, product.id]
  );

  const handleProductQuantityChange = (quantity: number) => {
        const findProduct = cartItems.find((item) => item.id === product.id);
        if (findProduct) {
            updateQuantity(product.id, quantity);
        }
        else {
            addToCart(product);
        }
  }
  return (
    <div className="flex items-center space-x-2 justify-center">
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className={`inline-flex items-center px-1 bg-primary text-white w-6 h-6 justify-center text-sm font-medium rounded-md hover:bg-gray-200 hover:text-primary cursor-pointer ${
            currentProductQuantity === index + 1 ? "bg-red-500 text-white" : "bg-gray-400 text-black"
          }`}
          onClick={() => {
            handleProductQuantityChange(index + 1);
          }}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

export default ProductQuantity;
