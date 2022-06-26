<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { i18n } from "@/plugins/i18n";

import { Address, cart, profile } from "@/composables/states";

const address = ref(
  profile.value.addresses.length ? profile.value.addresses[0] : ({} as Address)
);
const orderNote = ref("");
const setAddressAsDefault = ref(profile.value.addresses.length === 0);
const { t } = i18n(getCurrentInstance());

async function checkout() {
  if (setAddressAsDefault.value) {
    profile.value.addresses.splice(0, 0, address.value);
  }
}
</script>
<template>
  <div class="container checkout">
    <form>
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="address.fullName"
      /><br />
      <label for="street">Street</label>
      <input
        type="text"
        id="street"
        v-model="address.street"
        autocomplete="street-address"
      /><br />
      <label for="district">District</label>
      <input
        type="text"
        id="district"
        v-model="address.district"
        autocomplete="address-level3"
      /><br />
      <label for="city">City</label>
      <input
        type="text"
        id="city"
        v-model="address.city"
        autocomplete="address-level2"
      /><br />
      <label for="state">State</label>
      <input
        type="text"
        id="state"
        v-model="address.state"
        autocomplete="address-level1"
      /><br />
      <label for="country">Country/Region</label>
      <input
        type="text"
        id="country"
        v-model="address.country"
        autocomplete="country-name"
      /><br />
      <label for="postal">Postal</label>
      <input
        type="text"
        id="postal"
        v-model="address.postal"
        autocomplete="postal-code"
      /><br />
      <label for="setAddressAsDefault"> Set as default </label>
      <input
        type="checkbox"
        id="setAddressAsDefault"
        v-model="setAddressAsDefault"
      /><br />
    </form>
    <textarea v-model="orderNote"></textarea>
    <button class="btn-normal primary" @click="checkout">
      <span v-text="t('Checkout')"></span>
    </button>
  </div>
</template>

<style>
.checkout label {
  display: inline-block;
  width: 140px;
}
</style>

<i18n lang="yaml">
en:
  Checkout: Checkout
zh-CN:
  Checkout: 确认订单
</i18n>
