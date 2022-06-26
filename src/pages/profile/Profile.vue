<script setup lang="ts">
import { onBeforeMount } from "vue";
import { profile } from "@/composables/states";

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
    <div v-text="profile.username"></div>
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
  </div>
</template>
