import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    product: Object,
  },
  render() {
    if (!this.product?.images) this.product.images = [];

    return h("div", { class: "product-detail" }, [
      h("div", { class: "product-general" }, [
        h(
          "div",
          { class: "detail-image" },
          this.product.images.map((image) =>
            h(
              "div",
              { class: "square" },
              h("img", { src: image, alt: this.product.name })
            )
          )
        ),
        h("div", { class: "detail-text" }, [
          h("div", { class: "price" }, [
            h("span", { class: "currency-prefix" }),
            h("span", { class: "final-price" }, this.product?.price),
          ]),
          h("div", { class: "name" }, this.product?.name),
          h("div", { id: "detailActions" }),
        ]),
      ]),
      h("div", {
        class: "description",
        innerHTML: this.product?.description,
      }),
      // Embed base64 encoded data
      h(
        "focus-data",
        { hidden: true },
        btoa(encodeURIComponent(JSON.stringify(this.product)))
      ),
    ]);
  },
});
