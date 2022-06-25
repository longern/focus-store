<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { computed, getCurrentInstance } from "vue";
import { createI18n, useI18n } from "vue-i18n";

import { cart, isMobile } from "@/composables/states";

const app = getCurrentInstance().appContext.app;
app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);
const { t } = useI18n();

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
  <main>
    <div v-if="cart.length" class="container">
      <div style="font-size: 1.2rem; padding: 8px">
        <span v-text="t('Cart')"></span>
        <span v-text="`\xA0(${cart.length})`"></span>
      </div>
      <div class="cart-items">
        <a v-for="item in cart" :key="item.id" :href="`/products/${item.id}`">
          <div class="cart-item">
            <div class="cart-item-image">
              <img :src="item.image" width="100" height="100" />
            </div>
            <div class="cart-item-details">
              <div class="cart-item-name">{{ item.name }}</div>
              <div class="cart-item-choices">
                <span v-for="value in item.choices" v-text="value"></span>
                <span v-text="'\xA0'"></span>
              </div>
              <div class="cart-item-price">
                <span class="currency-prefix"></span>
                <span v-text="item.unitPrice"></span>
              </div>
            </div>
            <button class="btn-icon" @click.prevent="removeFromCart(item)">
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
        <Teleport to="#navExtra" :disabled="!isMobile">
          <a href="/checkout">
            <button class="btn-normal primary">Checkout</button>
          </a>
        </Teleport>
      </div>
    </div>
    <div v-else class="cart-empty">
      <div class="cart-empty-text">
        <span v-text="t('Your cart is empty')"></span>
      </div>
      <a href="/products" class="cart-empty-link">
        <button class="btn-normal primary">
          <span v-text="t('Continue Shopping')"></span>
        </button>
      </a>
    </div>
  </main>
</template>

<style>
.cart-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-image {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.total-price {
  margin: 12px 0;
  font-size: 1.3em;
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

<i18n lang="yaml">
en:
  Cart: Cart
  Continue Shopping: Continue Shopping
  "Total: ": "Total: "
  Your cart is empty: Your cart is empty
zh-CN:
  Cart: 购物车
  Continue Shopping: 继续购物
  "Total: ": 合计：
  Your cart is empty: 购物车是空的
</i18n>
