<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";

import OrderItem from "./OrderItem.vue";
import { Order } from "@/interfaces";

const mounted = ref(false);
const order = reactive({} as Order);

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
  <div class="container">
    <div v-if="!mounted" class="order-detail-loading">Loading...</div>
    <div v-else class="order-detail">
      <div>
        <div v-text="order.id"></div>
        <div v-text="order.status"></div>
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
