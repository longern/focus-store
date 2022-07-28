<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { computed, getCurrentInstance } from "vue";

import { cart, isMobile } from "@/composables/states";
import { i18n } from "@/plugins/i18n";

const { t } = i18n(getCurrentInstance());

const totalPrice = computed(() => {
  let total = 0;
  for (const item of cart.value) {
    total += item.unitPrice * item.quantity;
  }
  return total;
});

function removeFromCart(product) {
  cart.value.splice(cart.value.indexOf(product), 1);
}
</script>

<template>
  <div v-if="cart.length" class="container cart">
    <div style="font-size: 1.2rem; padding: 8px">
      <span v-text="t('Cart')"></span>
      <span v-text="`\xA0(${cart.length})`"></span>
    </div>
    <div class="cart-items">
      <a v-for="item in cart" :key="item.id" :href="`/products/${item.id}`">
        <div class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" width="100" height="100" :alt="item.name" />
          </div>
          <div class="cart-item-text">
            <div class="cart-item-name">{{ item.name }}</div>
            <div style="display: flex">
              <div class="cart-item-details">
                <div class="cart-item-choices">
                  <span v-for="value in item.choices" v-text="value"></span>
                  <span v-text="'\xA0'"></span>
                </div>
                <div class="cart-item-price">
                  <span class="currency-prefix"></span>
                  <span v-text="item.unitPrice"></span>
                </div>
              </div>
              <div class="cart-item-quantity" @click.prevent>
                <input
                  type="number"
                  min="1"
                  step="1"
                  :aria-label="t('Quantity')"
                  v-model="item.quantity"
                  style="width: 48px"
                />
              </div>
            </div>
          </div>
          <button
            class="btn-icon"
            @click.prevent="removeFromCart(item)"
            aria-label="Remove from cart"
          >
            <SvgIcon type="mdi" :path="mdiClose"></SvgIcon>
          </button>
        </div>
      </a>
    </div>
    <div style="text-align: right">
      <div class="total-price">
        <span v-text="t('Total: ')"></span>
        <span class="currency-prefix"></span>
        <span v-text="totalPrice"></span>
      </div>
      <a href="/checkout" class="btn-normal primary" v-text="t('Checkout')" />
    </div>
  </div>
  <div v-else class="cart-empty">
    <div class="cart-empty-text">
      <span v-text="t('Your cart is empty')"></span>
    </div>
    <a href="/products" class="cart-empty-link btn-normal primary">
      <span v-text="t('Continue Shopping')"></span>
    </a>
  </div>
</template>

<style>
.cart {
  padding: 8px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
}

.cart-item-image {
  flex-shrink: 0;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.cart-item-text {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: space-evenly;
}

.cart-item-details {
  flex-grow: 1;
  min-width: 0;
}

.cart-item-name {
  display: -webkit-box;
  line-height: 1.2em;
  min-height: 2.4em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-choices {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-quantity {
  height: 100%;
}

.total-price {
  margin: 12px 0;
  font-size: 1.3em;
}

.cart-empty {
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

<i18n lang="yaml">
en:
  Cart: Cart
  Checkout: Checkout
  Continue Shopping: Continue Shopping
  "Total: ": "Total: "
  Quantity: Quantity
  Your cart is empty: Your cart is empty
zh-CN:
  Cart: 购物车
  Checkout: 结算
  Continue Shopping: 继续购物
  "Total: ": 合计：
  Quantity: 数量
  Your cart is empty: 购物车是空的
</i18n>
