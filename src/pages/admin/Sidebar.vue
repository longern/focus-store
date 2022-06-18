<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <aside>
    <div class="drawer-list">
      <div v-text="t('Website')"></div>
      <div v-text="t('Products')"></div>
      <div v-text="t('Orders')"></div>
    </div>
  </aside>
</template>

<style>
html > body {
  flex-direction: row;
}

aside {
  width: 300px;
  flex-shrink: 0;
  background-color: #333;
  color: white;
}

.drawer-list > div {
  padding: 1rem 4rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.drawer-list > div:hover {
  background-color: #555;
}
</style>

<i18n lang="yaml">
en:
  Orders: Orders
  Products: Products
  Website: Website
"zh-CN":
  Orders: 订单
  Products: 产品
  Website: 网站
</i18n>
