"use server";

import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: "https://dev-ecomm-fiifi.pantheonsite.io/",
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
});

export async function getProducts() {
  let allProducts: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await WooCommerce.get("products", {
      per_page: 100, // Maximum allowed by WooCommerce API
      page: page,
    });

    const products = response.data;
    allProducts = [...allProducts, ...products];

    // Check if we've reached the last page
    if (products.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allProducts;
}

export async function getProductById(id: string) {
  const product = await WooCommerce.get(`products`, {
    id: parseInt(id),
  });
  return product.data;
}

export async function getProductsByCategory(categoryId: string) {
  let allProducts: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await WooCommerce.get("products", {
      category: categoryId,
      per_page: 100,
      page: page,
    });

    const products = response.data;
    allProducts = [...allProducts, ...products];

    // Check if we've reached the last page
    if (products.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allProducts;
}

export async function getCategories() {
  const categories = await WooCommerce.get(`products/categories`);
  return categories.data;
}
