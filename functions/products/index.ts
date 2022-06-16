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

export async function onRequest({ env, next }) {
  try {
    const { keys: productKeys } = await env.NAMESPACE.list({
      prefix: "products:",
    });
    const products = await Promise.all(
      productKeys.map(async (key) =>
        JSON.parse(await env.NAMESPACE.get(key.name))
      )
    );

    const res: Response = await next();
    return new HTMLRewriter()
      .on(".products", new ProductsInjector(products))
      .transform(res);
  } catch (err) {
    return new Response(err.toString());
  }
}
