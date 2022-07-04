<script setup lang="ts">
import { i18n } from "@/plugins/i18n";
import { computed, getCurrentInstance, reactive, ref } from "vue";

import MenuTab from "@/components/MenuTab.vue";
import MenuTabs from "@/components/MenuTabs.vue";
import { cart, profile } from "@/composables/states";
import { Address, Order } from "@/interfaces";

const order = reactive({ payment: "manual" } as Order);
order.address = profile.value.addresses.length
  ? profile.value.addresses[0]
  : ({} as Address);
const setAddressAsDefault = ref(profile.value.addresses.length === 0);
const { t } = i18n(getCurrentInstance());

const totalPrice = computed(() => {
  let total = 0;
  for (const item of cart.value) {
    total += item.unitPrice * item.quantity;
  }
  return total;
});

async function checkout() {
  if (setAddressAsDefault.value) {
    profile.value.addresses.splice(0, 0, order.address);
  }

  const response = await fetch("/api/orders", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  const orderId = ((await response.json()) as Order).id;

  window.location.href = new URL(
    `/pay?order=${orderId}`,
    window.location.origin
  ).toString();
}
</script>

<template>
  <div class="container checkout">
    <div class="order-items">
      <div v-for="item in cart" :key="item.id">
        <div class="order-item">
          <div class="order-item-image">
            <img :src="item.image" width="100" height="100" />
          </div>
          <div class="order-item-text">
            <div class="order-item-name">{{ item.name }}</div>
            <div style="display: flex">
              <div class="order-item-details">
                <div class="order-item-choices">
                  <span v-for="value in item.choices" v-text="value"></span>
                  <span v-text="'\xA0'"></span>
                </div>
                <div class="order-item-price">
                  <span class="currency-prefix"></span>
                  <span v-text="item.unitPrice"></span>
                </div>
              </div>
              <div class="order-item-quantity" @click.prevent>
                <span v-text="`x${item.quantity}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MenuTabs>
      <MenuTab :title="t('Address')">
        <div>
          <form>
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="order.address.fullName"
            /><br />
            <label for="street">Street</label>
            <input
              type="text"
              id="street"
              v-model="order.address.street"
              autocomplete="street-address"
            /><br />
            <label for="district">District</label>
            <input
              type="text"
              id="district"
              v-model="order.address.district"
              autocomplete="address-level3"
            /><br />
            <label for="city">City</label>
            <input
              type="text"
              id="city"
              v-model="order.address.city"
              autocomplete="address-level2"
            /><br />
            <label for="state">State</label>
            <input
              type="text"
              id="state"
              v-model="order.address.state"
              autocomplete="address-level1"
            /><br />
            <label for="country">Country/Region</label>
            <input
              type="text"
              id="country"
              v-model="order.address.country"
              autocomplete="country-name"
            /><br />
            <label for="postal">Postal</label>
            <input
              type="text"
              id="postal"
              v-model="order.address.postal"
              autocomplete="postal-code"
            /><br />
            <label for="setAddressAsDefault">Set as default</label>
            <input
              type="checkbox"
              id="setAddressAsDefault"
              v-model="setAddressAsDefault"
            /><br />
          </form>
        </div>
      </MenuTab>
      <MenuTab :title="t('Payment method')">
        <form>
          <div>
            <label>
              <input type="radio" v-model="order.payment" value="manual" />
              <span v-text="t('Manual payment')" />
            </label>
          </div>
        </form>
      </MenuTab>
      <MenuTab :title="t('Other information')">
        <div>
          <label for="note">Note</label>
          <textarea id="note" v-model="order.note"></textarea>
        </div>
      </MenuTab>
    </MenuTabs>
    <div style="margin-top: 16px; text-align: right">
      <span style="margin-right: 8px">
        <span v-text="t('Total: ')"></span>
        <span class="currency-prefix"></span>
        <span v-text="totalPrice"></span>
      </span>
      <button class="btn-normal primary" @click="checkout">
        <span v-text="t('Checkout')"></span>
      </button>
    </div>
  </div>
</template>

<style is:global>
.checkout {
  padding: 8px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
}

.order-item-image {
  flex-shrink: 0;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.order-item-text {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: space-evenly;
}

.order-item-details {
  flex-grow: 1;
  min-width: 0;
}

.order-item-name {
  display: -webkit-box;
  line-height: 1.2em;
  min-height: 2.4em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-choices {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-quantity {
  height: 100%;
}

.checkout label {
  display: inline-block;
  width: 140px;
}

.checkout textarea {
  box-sizing: border-box;
  width: 100%;
}
</style>

<i18n lang="yaml">
en:
  Address: Address
  Checkout: Checkout
  Manual payment: Manual payment
  Other information: Other information
  Payment method: Payment method
  "Total: ": "Total: "
zh-CN:
  Address: 地址
  Checkout: 确认订单
  Manual payment: 手动支付
  Other information: 其它信息
  Payment method: 支付方式
  "Total: ": 合计：
</i18n>
