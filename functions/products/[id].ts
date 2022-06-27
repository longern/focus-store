import { h } from "vue";
import { renderToString } from "vue/server-renderer";

import ProductDetail from "@/components/ProductDetail";

class ProductsInjector {
  product: any;

  constructor(product) {
    this.product = product;
  }

  async element(element) {
    const html = await renderToString(
      h(ProductDetail, { product: this.product })
    );
    element.setInnerContent(html, { html: true });
  }
}

export async function onRequest({ request, params, env, next }) {
  try {
    const product = JSON.parse(
      await env.NAMESPACE.get(`products:${params.id}`)
    );

    const req = new Request(`${new URL(request.url).origin}/products/id.html`, {
      cf: request.cf,
    });
    const res: Response = await env.ASSETS.fetch(req);
    return new HTMLRewriter()
      .on(".product-detail", new ProductsInjector(product))
      .transform(res);
  } catch (err) {
    return new Response(`${err.toString()} ${err.stack}`);
  }
}
