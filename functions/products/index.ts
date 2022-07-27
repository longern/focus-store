import { h } from "vue";
import { renderToString } from "vue/server-renderer";

import ProductCard from "@/components/ProductCard";
import { viewList } from "@/plugins/functions/restful";

class ProductsInjector {
  products: any;

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
    let products: Array<any> = await productsResponse.json();

    const params = new URLSearchParams(new URL(request.url).search);
    if (params.has("search")) {
      const search = params.get("search").toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }

    if (params.has("category")) {
      const category = params.get("category");
      products = products.filter((product) =>
        product.category.startsWith(category)
      );
    }

    if (params.has("ordering")) {
      const ordering = params.get("ordering");
      products = products.sort((a, b) => {
        return a[ordering] - b[ordering];
      });
    }

    const response: Response = await next();
    const rewrittenResponse = new HTMLRewriter()
      .on(".products", new ProductsInjector(products))
      .transform(response);

    return rewrittenResponse;
  } catch (err) {
    return new Response(err.toString());
  }
}
