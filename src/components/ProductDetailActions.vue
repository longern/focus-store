<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartPlus } from "@mdi/js";
import { computed, onBeforeMount, reactive } from "vue";

import { cart, isMobile } from "@/composables/states";
import { Product } from "@/interfaces";

const product = reactive({} as Product);
const choices = reactive({});

function addToCart() {
  cart.value.push(product);
}

onBeforeMount(() => {
  const productData = decodeURIComponent(
    atob(document.querySelector("focus-data").textContent)
  );
  Object.assign(product, JSON.parse(productData));
  for (const option of product.options) {
    choices[option.name] = option.values[0].text;
  }
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
</template>

<style>
.option {
  margin-bottom: 24px;
}

.option-value {
  margin: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: lightgray;
  background-clip: padding-box;
  cursor: pointer;
  border: 1px solid transparent;
}

input[type="radio"]:checked + .option-value {
  border-color: #333;
}
</style>
