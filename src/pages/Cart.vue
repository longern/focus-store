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
    <div class="cart-items" v-if="cart.length">
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
    <div class="cart-empty" v-else>
      <div class="cart-empty-text">Your cart is empty</div>
      <a href="/products" class="cart-empty-link">
        <button class="btn-normal primary">
          <span>Continue Shopping</span>
        </button>
      </a>
    </div>
  </main>
</template>

<style>
.cart-item {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.cart-item-image {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.cart-empty {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.cart-empty-link {
  margin-top: 1rem;
}
</style>
