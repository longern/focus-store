import { h } from "vue";
import { renderToString } from "vue/server-renderer";

import ProductCard from "../../src/components/ProductCard";

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

async function fetchProducts({ request, env, waitUntil }) {
  const cache = await caches.open("focus");
  const cachedResponse = await cache.match(request);

  const lastModified = await env.NAMESPACE.get("products/Last-Modified");
  if (
    cachedResponse &&
    lastModified &&
    new Date(cachedResponse.headers.get("date")) >= new Date(lastModified)
  )
    return cachedResponse;

  const { keys } = await env.NAMESPACE.list({ prefix: "products:" });
  const products = await Promise.all(
    keys.map(async (key: { name: string }) =>
      JSON.parse(await env.NAMESPACE.get(key.name))
    )
  );
  const response = new Response(JSON.stringify(products), {
    headers: {
      "Content-Type": "application/json",
      date: new Date().toUTCString(),
    },
  });

  waitUntil(cache.put(request, response.clone()));

  return response;
}

export async function onRequest({ request, env, waitUntil, next }) {
  try {
    const apiUrl = new URL("/api/products", request.url);
    const productRequest = new Request(apiUrl);
    const productsResponse = await fetchProducts({
      request: productRequest,
      env,
      waitUntil,
    });
    const products = await productsResponse.json();

    const response: Response = await next();
    const rewrittenResponse = new HTMLRewriter()
      .on(".products", new ProductsInjector(products))
      .transform(response);

    return rewrittenResponse;
  } catch (err) {
    return new Response(err.toString());
  }
}
