<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCart } from "@mdi/js";
</script>

<template>
  <header>
    <div style="flex-grow: 1"></div>
    <button class="btn-icon">
      <SvgIcon type="mdi" :path="mdiCart"></SvgIcon>
    </button>
  </header>
</template>

<style is:global>
header {
  flex-shrink: 0;
  display: flex;
  background-color: #333;
  color: white;
}
</style>
