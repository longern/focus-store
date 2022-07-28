<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
} from "vue";
import { createI18n, useI18n } from "vue-i18n";

import { cart } from "@/composables/states";
import { Product } from "@/interfaces";

const app = getCurrentInstance().appContext.app;
app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);

const product = reactive({} as Product);
const choices = reactive({} as Record<string, string>);
const quantity = ref(1);
const { t } = useI18n();

const finalPrice = computed(() => {
  let finalPrice = product.price;
  for (const option of product.options) {
    const choiceValue = option.values.find(
      (value) => value.text === choices?.[option.name]
    );
    finalPrice += Number(choiceValue?.priceModifier || "0");
  }
  return finalPrice;
});

function addToCart() {
  for (const item of cart.value) {
    if (
      item.id === product.id &&
      JSON.stringify(item.choices) === JSON.stringify(choices)
    ) {
      item.quantity++;
      return;
    }
  }

  cart.value.push({
    id: product.id,
    name: product.name,
    image: product.images?.[0],
    unitPrice: finalPrice.value,
    quantity: quantity.value,
    choices: Object.assign({}, choices),
  });
}

onBeforeMount(() => {
  const productData = decodeURIComponent(
    atob(document.querySelector("focus-data").textContent)
  );
  Object.assign(product, JSON.parse(productData));
  product.options ||= [];
  for (const option of product.options) {
    choices[option.name] = option.values[0].text;
  }

  document.querySelector(".final-price").textContent = "";
});
</script>

<template>
  <Teleport to="#detailActions">
    <div v-for="option in product.options" class="option">
      <div class="option-name">{{ option.name }}</div>
      <div>
        <label v-for="value in option.values">
          <input
            v-model="choices[option.name]"
            :value="value.text"
            type="radio"
            hidden
          />
          <div class="option-value" tabindex="0">
            <span v-text="value.text"></span>
          </div>
        </label>
      </div>
    </div>

    <div class="option">
      <label
        class="option-name"
        v-text="t('Quantity')"
        :for="`quantity-${$.uid}`"
      ></label>
      <div>
        <input
          v-model="quantity"
          type="number"
          :id="`quantity-${$.uid}`"
          min="1"
          step="1"
        />
      </div>
    </div>

    <div class="buy-buttons">
      <button class="btn-normal primary" @click="addToCart">
        <span v-text="t('Add to Cart')"></span>
      </button>
    </div>
  </Teleport>
  <Teleport to=".final-price">
    <span v-text="finalPrice"></span>
  </Teleport>
</template>

<i18n lang="yaml">
en:
  Add to Cart: Add to Cart
  Quantity: Quantity
zh-CN:
  Add to Cart: 加入购物车
  Quantity: 数量
</i18n>
