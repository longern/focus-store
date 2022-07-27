<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { Product } from "@/interfaces";

const products = reactive(<Array<Product>>[]);
const { t } = useI18n();

onBeforeMount(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((res: Array<Product>) => {
      products.splice(0, products.length, ...res);
    });
});
</script>

<template>
  <div>
    <h1 v-text="t('Products')"></h1>

    <router-link to="/products/new">
      <button class="btn-normal primary">
        <span v-text="t('Add New Product')"></span>
      </button>
    </router-link>

    <div class="product-list">
      <router-link :to="`/products/${product.id}`" v-for="product in products">
        <div class="product-item">
          <div class="product-image">
            <img :src="product.images?.[0]" height="100" width="100" />
          </div>
          <div class="product-info">
            <div class="product-name">
              <span v-text="product.name"></span>
            </div>
            <div class="product-price">
              <span v-text="product.price"></span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s ease-in-out;
}

.product-item:hover {
  background-color: white;
}

.product-image {
  margin-right: 1rem;
}
</style>

<i18n lang="yaml">
en:
  Add New Product: Add New Product
  Products: Products
zh-CN:
  Add New Product: 添加新商品
  Products: 商品
</i18n>
