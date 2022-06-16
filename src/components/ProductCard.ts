import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    product: Object,
  },
  render() {
    return h(
      "a",
      { href: `/products/${this.product?.id}`, class: "product-card" },
      [
        h("img", { src: this.product?.images?.[0] }),
        h("div", { class: "name" }, this.product?.name),
      ]
    );
  },
});
