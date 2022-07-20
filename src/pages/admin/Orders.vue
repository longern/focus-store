<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { Order } from "@/interfaces";
import OrderItem from "@/components/OrderItem.vue";

const orders = reactive(<Array<Order>>[]);
const { t } = useI18n();

function totalPrice(order: Order) {
  return order.products.reduce((total, product) => {
    return total + product.unitPrice * product.quantity;
  }, 0);
}

function updateOrder(order: Order) {
  fetch(`/admin/api/orders/${order.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
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
    <div class="order-list-item" v-for="order in orders">
      <div class="order-info">
        <div class="order-id">
          <span v-text="order.id"></span>
        </div>
        <div class="product-list">
          <OrderItem v-for="item in order.products" :item="item"></OrderItem>
        </div>
        <div class="order-date">
          <span v-text="new Date(order.createdAt).toLocaleString()"></span>
        </div>
        <div class="order-status">
          <select v-model="order.status" @change="updateOrder(order)">
            <option value="pendingPayment">Pending Payment</option>
            <option value="paid">Paid</option>
            <option value="shipping">Shipping</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
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

<style>
.order-list .order-list-item {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  background-color: white;
}

.order-list .order-id {
  font-size: 0.8rem;
  color: #666;
}
</style>
