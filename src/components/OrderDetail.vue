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

async function pay() {
  const paymentRequest = new PaymentRequest(
    [
      {
        supportedMethods: "https://manual-payment.pages.dev/",
        data: { redirect_url: window.location.origin + "/pay/manual" },
      },
    ],
    {
      total: {
        label: t("Total"),
        amount: {
          currency: "USD",
          value: order.totalPrice.toFixed(2),
        },
      },
    }
  );

  try {
    if (!(await paymentRequest.canMakePayment()))
      window.location.href = "/pay/fallback";
    await paymentRequest.show();
  } catch (e) {
    document.title = e.toString();
  }
}

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
        <div class="order-detail-field">
          <span class="order-detail-key" v-text="t('Order ID')"></span>
          <span v-text="order.id"></span>
        </div>
        <div class="order-detail-field">
          <span class="order-detail-key" v-text="t('Full Name')"></span>
          <span v-text="order.address.fullName"></span>
        </div>
        <div class="order-detail-field">
          <span class="order-detail-key" v-text="t('Tel')"></span>
          <span v-text="order.address.tel"></span>
        </div>
        <div class="order-detail-field">
          <span class="order-detail-key" v-text="t('Shipping Address')"></span>
          <div>
            <span v-text="order.address.street"></span>
            <span v-text="order.address.district"></span>
            <span v-text="order.address.city"></span>
            <span v-text="order.address.state"></span>
            <span v-text="order.address.country"></span>
          </div>
        </div>
        <div class="order-detail-field">
          <span class="order-detail-key" v-text="t('Created at')"></span>
          <span v-text="new Date(order.createdAt).toLocaleString()"></span>
        </div>
      </div>
      <div class="product-list">
        <template v-for="item in order.products" :key="item.id">
          <OrderItem :item="item"></OrderItem>
        </template>
        <div style="text-align: right">
          <div class="total-price">
            <span v-text="t('Total') + ': '"></span>
            <span class="currency-prefix"></span>
            <span v-text="order.totalPrice"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-actions">
      <button
        class="btn-normal primary"
        v-if="order.status === 'pendingPayment'"
        v-text="t('Pay')"
        @click="pay"
      ></button>
      <button
        class="btn-normal primary"
        v-if="order.status === 'shipping'"
        v-text="t('Confirm receipt')"
      ></button>
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
  column-gap: 24px;
}

.order-detail > .product-list {
  flex-grow: 1;
  flex-shrink: 0;
  max-width: 100%;
  width: 768px;
}

.order-detail-status {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
}

.order-detail-field {
  display: flex;
  padding: 0.3rem 0;
}

.order-detail-key {
  flex-shrink: 0;
  width: 128px;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  margin: 8px;
}

@media (max-width: 960px) {
  .order-detail {
    flex-direction: column;
  }
}
</style>

<i18n lang="yaml">
en:
  Cancelled: "Cancelled"
  Completed: "Completed"
  Confirm receipt: "Confirm receipt"
  Created at: "Created at"
  Full Name: "Full Name"
  Order ID: "Order ID"
  Paid: "Paid"
  Pay: "Pay"
  Pending Payment: "Pending Payment"
  Shipping: "Shipping"
  Shipping Address: "Shipping Address"
  Tel: "Tel"
  Total: "Total"
zh-CN:
  Cancelled: "已取消"
  Completed: "已完成"
  Confirm receipt: "确认收货"
  Created at: "创建时间"
  Full Name: "姓名"
  Order ID: "订单编号"
  Paid: "已付款"
  Pay: "付款"
  Pending Payment: "待付款"
  Shipping: "配送中"
  Shipping Address: "配送地址"
  Tel: "电话"
  Total: "总计"
</i18n>
