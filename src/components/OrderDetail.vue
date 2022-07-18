<script setup lang="ts">
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "vue";

import OrderItem from "./OrderItem.vue";
import { Order } from "@/interfaces";
import { i18n } from "@/plugins/i18n";

const mounted = ref(false);
const order = reactive({} as Order);
const { t } = i18n(getCurrentInstance());

onBeforeMount(() => {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("id");
  if (orderId) {
    fetch(`/api/orders/${orderId}`)
      .then((response) => response.json())
      .then(async (data) => {
        Object.assign(order, data);
      });
  }
});

onMounted(() => (mounted.value = true));
</script>

<template>
  <div v-if="!mounted || !order.id" class="order-detail-loading">
    <span>Loading...</span>
  </div>
  <div v-else class="container">
    <div class="order-detail">
      <div>
        <div class="order-detail-status">
          <span
            v-if="order.status === 'pendingPayment'"
            v-text="t('Pending Payment')"
          ></span>
          <span v-else-if="order.status === 'paid'" v-text="t('Paid')"></span>
          <span
            v-else-if="order.status === 'cancelled'"
            v-text="t('Cancelled')"
          ></span>
          <span
            v-else-if="order.status === 'shipping'"
            v-text="t('Shipping')"
          ></span>
          <span
            v-else-if="order.status === 'completed'"
            v-text="t('Completed')"
          ></span>
        </div>
        <div v-text="order.id"></div>
        <div v-text="order.address.fullName"></div>
        <div v-text="order.address.tel"></div>
        <div>
          <span v-text="order.address.street"></span>
          <span v-text="order.address.district"></span>
          <span v-text="order.address.city"></span>
          <span v-text="order.address.state"></span>
          <span v-text="order.address.country"></span>
        </div>
        <div v-text="new Date(order.createdAt).toLocaleString()"></div>
      </div>
      <div class="product-list">
        <template v-for="item in order.products" :key="item.id">
          <OrderItem :item="item"></OrderItem>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.order-detail-loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-detail {
  display: flex;
  padding: 8px;
}

.order-detail > .product-list {
  flex-grow: 1;
}

@media (max-width: 960px) {
  .order-detail {
    flex-direction: column;
  }
}
</style>

<i18n lang="yaml">
en:
  Pending Payment: "Pending Payment"
  Paid: "Paid"
  Cancelled: "Cancelled"
  Shipping: "Shipping"
  Completed: "Completed"
zh-CN:
  Pending Payment: "待付款"
  Paid: "已付款"
  Cancelled: "已取消"
  Shipping: "配送中"
  Completed: "已完成"
</i18n>
