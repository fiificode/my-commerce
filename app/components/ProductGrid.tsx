"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  products: any[];
};

const ProductGrid = ({ products }: Props) => {
  console.log("products", products);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Products Found
          </h2>
          <p className="text-gray-500">
            There are no products available in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <Link
              href={`/product/${product.id}`}
              key={index}
              className="flex flex-col group relative"
            >
              <div className="aspect-square rounded-md overflow-hidden">
                <Image
                  src={product.images[0]?.src || "/placeholder.png"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="text-base font-semibold text-primary">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;
