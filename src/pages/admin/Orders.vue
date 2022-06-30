<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { Order } from "@/interfaces";

const orders = reactive(<Array<Order>>[]);
const { t } = useI18n();

function totalPrice(order) {
  return order.products.reduce((total, product) => {
    return total + product.unitPrice * product.quantity;
  }, 0);
}

onBeforeMount(() => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((res: Array<Order>) => {
      orders.splice(0, orders.length, ...res);
    });
});
</script>

<template>
  <h1 v-text="t('Orders')"></h1>
  <div class="order-list">
    <div class="order-item" v-for="order in orders">
      <div class="order-info">
        <div class="order-id">
          <span v-text="order.id"></span>
        </div>
        <div class="order-date">
          <span v-text="order.createdAt"></span>
        </div>
        <div class="order-status">
          <span v-text="order.status"></span>
        </div>
      </div>
      <div class="order-total">
        <span v-text="totalPrice(order)"></span>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  Orders: Orders
zh-CN:
  Orders: 订单
</i18n>
