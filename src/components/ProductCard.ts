import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    product: Object,
  },
  render() {
    return h(
      "div",
      { class: "product-card" },
      h("a", { href: `/products/${this.product?.id}` }, [
        h(
          "div",
          { class: "square" },
          h("img", { src: this.product?.images?.[0], alt: this.product?.name })
        ),
        h("div", { class: "card-text" }, [
          h("div", { class: "name" }, this.product?.name),
          h("div", { class: "price" }, [
            h("span", { class: "currency-prefix" }),
            h("span", this.product?.price),
          ]),
        ]),
      ])
    );
  },
});
