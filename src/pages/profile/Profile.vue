<script setup lang="ts">
import { getCurrentInstance, onBeforeMount } from "vue";
import { i18n } from "@/plugins/i18n";

import MenuTab from "@/components/MenuTab.vue";
import MenuTabs from "@/components/MenuTabs.vue";
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
  <div class="container">
    <MenuTabs>
      <MenuTab :title="t('Measurements')">
        <form>
          <label for="height">Height</label>
          <input
            type="text"
            id="height"
            v-model="profile.measurements.height"
          />
          <br />
          <label for="weight">Weight</label>
          <input
            type="text"
            id="weight"
            v-model="profile.measurements.weight"
          />
          <br />
          <label for="chest">Chest</label>
          <input type="text" id="chest" v-model="profile.measurements.chest" />
          <br />
        </form>
      </MenuTab>
      <MenuTab :title="t('Shipping address')">
        <form>
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="profile.addresses[0].fullName"
          /><br />
          <label for="street">Street</label>
          <input
            type="text"
            id="street"
            v-model="profile.addresses[0].street"
            autocomplete="street-address"
          /><br />
          <label for="district">District</label>
          <input
            type="text"
            id="district"
            v-model="profile.addresses[0].district"
            autocomplete="address-level3"
          /><br />
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            v-model="profile.addresses[0].city"
            autocomplete="address-level2"
          /><br />
          <label for="state">State</label>
          <input
            type="text"
            id="state"
            v-model="profile.addresses[0].state"
            autocomplete="address-level1"
          /><br />
          <label for="country">Country/Region</label>
          <input
            type="text"
            id="country"
            v-model="profile.addresses[0].country"
            autocomplete="country-name"
          /><br />
          <label for="postal">Postal</label>
          <input
            type="text"
            id="postal"
            v-model="profile.addresses[0].postal"
            autocomplete="postal-code"
          /><br />
        </form>
      </MenuTab>
      <!--
      <MenuTab :title="t('Payment')">
      </MenuTab>
      -->
    </MenuTabs>
  </div>
</template>

<i18n lang="yaml">
en:
  Measurements: Measurements
  Payment: Payment
  Shipping Address: Shipping address
zh-CN:
  Measurements: 尺寸信息
  Payment: 支付
  Shipping address: 收货地址
</i18n>
