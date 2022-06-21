<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { mdiCartPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

import { cart } from "@/composables/states";

const product = reactive({});
const isMobile = window.innerWidth <= 960;

function addToCart() {
  cart.value.push(product);
}

onBeforeMount(() => {
  const productData = atob(document.querySelector("focus-data").textContent);
  Object.assign(product, JSON.parse(productData));
});
</script>

<template>
  <Teleport v-if="!isMobile" to="#detailActions">
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
