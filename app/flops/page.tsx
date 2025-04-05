import React from "react";
import ProductGrid from "../components/ProductGrid";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "@/actions/product";

const FlopsPage = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  //   const categoryId = categories.find((category) => category.name === "Flops")
  const categoryId = categories[2].id; // Get the first category's ID
  const productsInCategory = await getProductsByCategory(categoryId);
  //   const productsInCategory = products.filter(
  //     (product) => product.categoryId === categoryId
  //   );
  console.log("products", products);
  console.log("categories", categories);
  console.log("objects", productsInCategory);
  return <ProductGrid products={productsInCategory} />;
};

export default FlopsPage;
