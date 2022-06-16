import { h } from "vue";
import { renderToString } from "vue/server-renderer";

import ProductCard from "../../src/components/ProductCard";

class ProductsInjector {
  product: any;

  constructor(product) {
    this.product = product;
  }

  async element(element) {
    const html = await renderToString(
      h(ProductCard, { product: this.product })
    );
    element.replace(html, { html: true });
  }
}

export async function onRequest({ request, env, next }) {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.replace(/^.*\//, "");
    const product = JSON.parse(
      await env.NAMESPACE.get(`products:${productId}`)
    );

    const req = new Request(`${url.origin}/products/id.html`, {
      cf: request.cf,
    });
    const res: Response = await env.ASSETS.fetch(req);
    return new HTMLRewriter()
      .on(".product-card", new ProductsInjector(product))
      .transform(res);
  } catch (err) {
    return new Response(`${err.toString()} ${err.stack}`);
  }
}
