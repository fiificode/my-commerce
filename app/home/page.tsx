import React from "react";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "@/actions/product";
import { FeaturedCategories } from "../components/categories";

const HomePage = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  const categoryId = categories[0].id; // Get the first category's ID
  const productsInCategory = await getProductsByCategory(categoryId);
  console.log("products", products);
  console.log("categories", categories);
  console.log("objects", productsInCategory);
  // return  <ProductGrid products={products} />;
  return <FeaturedCategories />;
};

export default HomePage;
