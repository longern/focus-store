<script setup lang="ts">
import { mdiClose } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

import { cart } from "@/composables/states";

function removeFromCart(product) {
  cart.value.splice(cart.value.indexOf(product), 1);
}
</script>

<template>
  <main>
    <div class="cart-items">
      <div class="cart-item" v-for="item in cart" :key="item.id">
        <div class="cart-item-image">
          <img :src="item.images?.[0]" width="100" height="100" />
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">{{ item.name }}</div>
          <div class="cart-item-price">{{ item.price }}</div>
        </div>
        <button class="btn-icon" @click="removeFromCart(item)">
          <SvgIcon type="mdi" :path="mdiClose"></SvgIcon>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.cart-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
</style>
