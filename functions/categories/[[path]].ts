import { h } from "vue";
import { renderToString } from "vue/server-renderer";

import ProductCard from "@/components/ProductCard";
import { viewList } from "@/plugins/functions/restful";
import { Product } from "@/interfaces";

class ProductsInjector {
  products: Array<Product>;

  constructor(products) {
    this.products = products;
  }

  async element(element) {
    const html = await renderToString(
      h(
        "div",
        { class: "products" },
        this.products.map((product) => h(ProductCard, { product: product }))
      )
    );
    element.replace(html, { html: true });
  }
}

export async function onRequest({ request, env, waitUntil, next }) {
  try {
    const apiUrl = new URL("/api/products", request.url);
    const productRequest = new Request(apiUrl);
    const productsResponse = await viewList({
      request: productRequest,
      env,
      waitUntil,
    });
    const products: Array<Product> = await productsResponse.json();

    const category = decodeURIComponent(
      request.url.replace(/.*?\/categories\//, "").replace(/\/?$/, "/")
    );
    const filteredProducts = products.filter((product) =>
      product.category.startsWith(category)
    );

    const req = new Request(`${new URL(request.url).origin}/products.html`, {
      cf: request.cf,
    });
    const response: Response = await env.ASSETS.fetch(req);
    const rewrittenResponse = new HTMLRewriter()
      .on(".products", new ProductsInjector(filteredProducts))
      .transform(response);

    return rewrittenResponse;
  } catch (err) {
    return new Response(err.toString());
  }
}
