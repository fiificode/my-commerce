import { getProductById } from "@/actions/product";
import ProductAction from "@/app/components/product/ProductAction";
import ProductQuantity from "@/app/components/product/ProductQuantity";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProdductDetailsPage = async ({ params: { id } }: Props) => {
  // getInfo of product
  const product = await getProductById(id);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-lg font-medium mb-6 hover:text-gray-600"
        >
          Back
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {product.images[0].src && (
              <div className="aspect-auto rounded-lg overflow-hidden flex items-center justify-center h-[80vh]">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col gap4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
                <h1 className="text-2xl font-bold">{product.name}</h1>

                <ProductQuantity product={product} />
                <div className="text-2xl font-bold">${product.price}</div>
              </div>
              <div
                className="text-gray-700 text-center md:text-left"
                dangerouslySetInnerHTML={{ __html: product.description }} //Dont do this in production.
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <ProductAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdductDetailsPage;
