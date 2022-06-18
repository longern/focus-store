<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <aside>
    <div class="drawer-list">
      <router-link to="/website">
        <span v-text="t('Website')"></span>
      </router-link>
      <router-link to="/products">
        <span v-text="t('Products')"></span>
      </router-link>
      <router-link to="/orders">
        <span v-text="t('Orders')"></span>
      </router-link>
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

.drawer-list > a {
  display: block;
  padding: 1rem 4rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.drawer-list > a:hover {
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
