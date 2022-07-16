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
  <div class="container" style="padding: 8px">
    <div v-if="!mounted" style="text-align: center">Loading...</div>
    <div v-else class="order-detail">
      <div v-for="item in order.products" :key="item.id">
        <OrderItem :item="item"></OrderItem>
      </div>
      <div v-text="order.id"></div>
      <div v-text="order.createdAt"></div>
    </div>
  </div>
</template>
