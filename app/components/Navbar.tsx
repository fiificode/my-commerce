"use client";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Minus,
  MoreVertical,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { navbarData } from "@/lib/data";
import Image from "next/image";
import Checkout from "./Checkout";

const Navbar = () => {
  const [toggle, setToggle] = React.useState(false);
  const pathname = usePathname();
  const {
    isOpen,
    setIsOpen,
    items: cartItems,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart();
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button onClick={() => setToggle(!toggle)}>
          {toggle ? (
            <X className="size-4 font-bold" />
          ) : (
            <MoreVertical className="size-4 font-bold" />
          )}
          <span className="sr-only">Menu</span>
        </Button>
        {toggle && (
          <div className="w-full flex gap-x-4 md:gap-x-10 items-center justify-center">
            {navbarData.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <ShoppingCart className="size-4" />
              {cartItems.length > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 p-2 text-xs font-medium bg-black text-white rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full bg-black/5 sm:max-w-md">
            <SheetHeader className="bg-white">
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cartItems.length > 0 ? (
              <div className="flex flex-col h-full bg-white">
                <div className="flex-1 overflow-auto p-6">
                  <ul className="space-y-6">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-4 border-b border-gray-100"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.images[0].src || "/placeholder.png"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <Button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded-md border p-1"
                              >
                                <Minus className="size-3" />
                              </Button>
                              <span className="mx-2 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-md border p-1"
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>
                            <Button
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-md text-red-500 p-1"
                              variant="ghost"
                              size="icon"
                            >
                              <Trash2 className="size-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black/50 h-4"></div>
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>${cartTotal}</p>
                  </div>
                  <Checkout />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="size-10 text-gray-300 mb-4" />
                <p className="text-gray-300">Your cart is empty.</p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
