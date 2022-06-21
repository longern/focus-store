<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { mdiCartPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

import { cart } from "@/composables/states";

const product = reactive({});

function addToCart() {
  cart.value.push(product);
}

onBeforeMount(() => {
  const productData = atob(document.querySelector("focus-data").textContent);
  Object.assign(product, JSON.parse(productData));
});
</script>

<template>
  <Teleport to="#navExtra">
    <button class="btn-icon" @click="addToCart">
      <SvgIcon type="mdi" :path="mdiCartPlus"></SvgIcon>
    </button>
  </Teleport>
</template>

<style></style>
