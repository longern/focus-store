<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { cart } from "@/composables/states";

const product = reactive({});

function addToCart() {
  cart.items.push(product);
}

onBeforeMount(() => {
  const productData = atob(document.querySelector("focus-data").textContent);
  Object.assign(product, JSON.parse(productData));
});
</script>

<template>
  <Teleport to="#navExtra">
    <div @click="addToCart">Add to cart</div>
  </Teleport>
</template>
