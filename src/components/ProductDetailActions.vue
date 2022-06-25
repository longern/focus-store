<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartPlus } from "@mdi/js";
import { computed, onBeforeMount, reactive } from "vue";

import { cart, isMobile } from "@/composables/states";
import { Product } from "@/interfaces";

const product = reactive({} as Product);
const choices = reactive({} as Record<string, string>);

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
    console.log(JSON.stringify(item.choices), JSON.stringify(choices));
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
    quantity: 1,
    choices: Object.assign({}, choices),
  });
}

onBeforeMount(() => {
  const productData = decodeURIComponent(
    atob(document.querySelector("focus-data").textContent)
  );
  Object.assign(product, JSON.parse(productData));
  for (const option of product.options) {
    choices[option.name] = option.values[0].text;
  }

  document.querySelector(".final-price").textContent = "";
});
</script>

<template>
  <Teleport v-if="!isMobile" to="#detailActions">
    <div v-for="option in product.options" class="option">
      <span>{{ option.name }}</span>
      <label v-for="value in option.values">
        <input
          v-model="choices[option.name]"
          :value="value.text"
          type="radio"
          hidden
        />
        <span class="option-value">
          <span v-text="value.text"></span>
        </span>
      </label>
    </div>
    <button class="btn-normal primary" @click="addToCart">
      <span>Add to Cart</span>
    </button>
  </Teleport>
  <Teleport v-else to="#navExtra">
    <button class="btn-icon" @click="addToCart">
      <SvgIcon type="mdi" :path="mdiCartPlus"></SvgIcon>
    </button>
  </Teleport>
  <Teleport to=".final-price">
    <span v-text="finalPrice"></span>
  </Teleport>
</template>
