import React from "react";
import { getProductsByCategory } from "@/actions/product";
import ProductGrid from "@/app/components/ProductGrid";
import BackButton from "@/app/components/BackButton";

interface Props {
  params: {
    id: string;
  };
}

const CategoryItems = async ({ params: { id } }: Props) => {
  const products = await getProductsByCategory(id);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold ml-8">
            {products?.[0]?.categories?.[0]?.name}
          </h1>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CategoryItems;
