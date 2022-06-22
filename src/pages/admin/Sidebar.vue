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
      <router-link to="/categories">
        <span v-text="t('Categories')"></span>
      </router-link>
      <router-link to="/orders">
        <span v-text="t('Orders')"></span>
      </router-link>
      <a href="/">
        <span v-text="t('Back to website')"></span>
      </a>
    </div>
  </aside>
</template>

<style>
aside {
  width: 300px;
  flex-shrink: 0;
  background-color: #333;
  color: white;
  z-index: 1;
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
  Back to website: Back to website
  Categories: Categories
  Orders: Orders
  Products: Products
  Website: Website
zh-CN:
  Back to website: 返回网站
  Categories: 分类
  Orders: 订单
  Products: 商品
  Website: 网站
</i18n>
