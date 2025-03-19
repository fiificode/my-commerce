"use client";
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import React from 'react'
import Checkout from '../Checkout';

type Props = {}

const ProductAction = (props: Props) => {
  const {items:cartItems, cartTotal} = useCart();
  return (
    <div className="rounded-lg bg-[#F4F4F5] p-6 sticky top-20 flex flex-col h-[80dvh]">
        <div>
            <div className='grid grid-cols-3 gap-4 pb-2 border-b text-base font-medium'>
                <div>Product</div>
                <div className="text-center">Q</div>
                <div className="text-right">Price</div>
            </div>
            {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-3 gap-4 text-normal py-2 text-base font-medium">
                    <div className="flex text-start truncate truncate-ellipsis">{item.name}</div>
                    <div className="text-center">{item.quantity}</div>
                    <div className="text-right">${item.price}</div>
                </div>
            ))}
        </div>
        <div className="mt-auto">
            <div className="flex justify-between items-center">
                <div>Subtotal</div>
                <div className="text-right">${cartTotal || 0}</div>
            </div>
        </div>

        <Checkout />
     
    </div>
  )
}

export default ProductAction