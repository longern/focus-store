import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    product: Object,
  },
  render() {
    return h("div", { class: "product-detail" }, [
      h(
        "div",
        { class: "detail-image" },
        h(
          "div",
          { class: "square" },
          h("img", { src: this.product?.images?.[0] })
        )
      ),
      h("div", { class: "detail-text" }, [
        h("div", { class: "price" }, this.product?.price),
        h("div", { class: "name" }, this.product?.name),
        h("div", { class: "description" }, this.product?.description),
      ]),
    ]);
  },
});
