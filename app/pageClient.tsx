"use client";

import type React from "react";
import { ViewTransitions } from "next-view-transitions";

import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import CartProvider from "@/providers/cart-context";

const inter = Inter({ subsets: ["latin"] });

export default function PageClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
              </main>
            </div>
          </CartProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
