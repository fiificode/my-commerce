"use server"

import WooCommerceRestApi from "woocommerce-rest-ts-api"

const WooCommerce = new WooCommerceRestApi({
    url:"https://dev-ecomm-fiifi.pantheonsite.io/",
    consumerKey: process.env.WC_CONSUMER_KEY as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET as string,
    version: "wc/v3",
})

export async function getProducts() {
    const products = await WooCommerce.get("products")
    return products.data
}

export async function getProductById(id: string) {
    const product = await WooCommerce.get(`products`,{
        id: parseInt(id)
    })
    return product.data
}
