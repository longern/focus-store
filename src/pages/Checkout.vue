<script setup lang="ts">
import { i18n } from "@/plugins/i18n";
import { getCurrentInstance, reactive, ref } from "vue";

import MenuTab from "@/components/MenuTab.vue";
import MenuTabs from "@/components/MenuTabs.vue";
import { profile } from "@/composables/states";
import { Address, Order } from "@/interfaces";

const order = reactive({} as Order);
order.address = profile.value.addresses.length
  ? profile.value.addresses[0]
  : ({} as Address);
const setAddressAsDefault = ref(profile.value.addresses.length === 0);
const { t } = i18n(getCurrentInstance());

async function checkout() {
  if (setAddressAsDefault.value) {
    profile.value.addresses.splice(0, 0, order.address);
  }

  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
}
</script>

<template>
  <div class="container checkout">
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
            <label for="setAddressAsDefault"> Set as default </label>
            <input
              type="checkbox"
              id="setAddressAsDefault"
              v-model="setAddressAsDefault"
            /><br />
          </form>
        </div>
      </MenuTab>
      <MenuTab :title="t('Other information')">
        <div>
          <textarea v-model="order.note"></textarea>
        </div>
      </MenuTab>
    </MenuTabs>
    <div>
      <button class="btn-normal primary" @click="checkout">
        <span v-text="t('Checkout')"></span>
      </button>
    </div>
  </div>
</template>

<style is:global>
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
  Other information: Other information
zh-CN:
  Address: 地址
  Checkout: 确认订单
  Other information: 其它信息
</i18n>
