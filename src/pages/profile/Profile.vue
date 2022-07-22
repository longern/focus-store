<script setup lang="ts">
import { i18n } from "@/plugins/i18n";
import { getCurrentInstance, onBeforeMount } from "vue";

import MenuTab from "@/components/MenuTab.vue";
import MenuTabs from "@/components/MenuTabs.vue";
import OrderItem from "@/components/OrderItem.vue";
import { profile } from "@/composables/states";

const { t } = i18n(getCurrentInstance());

onBeforeMount(async () => {
  const identityResponse = await fetch("/api/users/me");
  if (identityResponse.ok) {
    const identity: any = await identityResponse.json();
    profile.value.username = identity.email;
  }
});
</script>

<template>
  <div class="profile container">
    <MenuTabs>
      <MenuTab :title="t('Orders')">
        <a
          v-for="order in profile.orders"
          :key="order.id"
          :href="`/orders?id=${order.id}`"
        >
          <div v-text="order.id"></div>
          <div class="product-list">
            <template v-for="item in order.products" :key="item.id">
              <OrderItem :item="item"></OrderItem>
            </template>
          </div>
        </a>
      </MenuTab>
      <MenuTab :title="t('Measurements')">
        <form>
          <p>
            <label for="height">Height</label>
            <input
              type="text"
              id="height"
              v-model="profile.measurements.height"
            />
          </p>
          <p>
            <label for="weight">Weight</label>
            <input
              type="text"
              id="weight"
              v-model="profile.measurements.weight"
            />
          </p>
          <p>
            <label for="chest">Chest</label>
            <input
              type="text"
              id="chest"
              v-model="profile.measurements.chest"
            />
          </p>
        </form>
      </MenuTab>
      <MenuTab :title="t('Shipping address')">
        <form>
          <p>
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="profile.addresses[0].fullName"
            />
          </p>
          <p>
            <label for="street">Street</label>
            <input
              type="text"
              id="street"
              v-model="profile.addresses[0].street"
              autocomplete="street-address"
            />
          </p>
          <p>
            <label for="district">District</label>
            <input
              type="text"
              id="district"
              v-model="profile.addresses[0].district"
              autocomplete="address-level3"
            />
          </p>
          <p>
            <label for="city">City</label>
            <input
              type="text"
              id="city"
              v-model="profile.addresses[0].city"
              autocomplete="address-level2"
            />
          </p>
          <p>
            <label for="state">State</label>
            <input
              type="text"
              id="state"
              v-model="profile.addresses[0].state"
              autocomplete="address-level1"
            />
          </p>
          <p>
            <label for="country">Country/Region</label>
            <input
              type="text"
              id="country"
              v-model="profile.addresses[0].country"
              autocomplete="country-name"
            />
          </p>
          <p>
            <label for="postal">Postal</label>
            <input
              type="text"
              id="postal"
              v-model="profile.addresses[0].postal"
              autocomplete="postal-code"
            />
          </p>
          <p>
            <label for="tel">Tel</label>
            <input
              type="text"
              id="tel"
              v-model="profile.addresses[0].tel"
              autocomplete="tel-national"
            />
          </p>
        </form>
      </MenuTab>
      <!--
      <MenuTab :title="t('Payment')">
      </MenuTab>
      -->
    </MenuTabs>
  </div>
</template>

<style>
.profile label {
  display: inline-block;
  width: 128px;
}
</style>

<i18n lang="yaml">
en:
  Measurements: Measurements
  Orders: Orders
  Payment: Payment
  Shipping Address: Shipping address
zh-CN:
  Measurements: 尺寸信息
  Orders: 订单
  Payment: 支付
  Shipping address: 收货地址
</i18n>
