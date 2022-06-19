<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

const products = reactive([]);
const { t } = useI18n();

onBeforeMount(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((res) => {
      products.splice(0, products.length, ...res);
    });
});
</script>

<template>
  <div>
    <h1 v-text="t('Products')"></h1>
    <div class="product-list">
      <router-link
        :to="`/admin/products/${product.id}`"
        v-for="product in products"
      >
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
  Products: Products
zh-CN:
  Products: 产品
</i18n>
