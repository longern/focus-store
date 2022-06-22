<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { Product } from "@/interfaces";

const props = defineProps({
  id: String,
});

const originalProductName = ref("\xA0");
const product = reactive({} as Product);
const saving = ref(false);

const { t } = useI18n();
const router = useRouter();

async function saveProduct() {
  saving.value = true;

  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const productId: string = (await response.json()).id;
  if (props.id === "new") {
    router.push(`/products/${productId}`);
  }
  originalProductName.value = product.name;

  saving.value = false;
}

onBeforeMount(() => {
  if (!props.id || props.id === "new") {
    originalProductName.value = t("New Product");
    return;
  }

  fetch(`/api/products/${props.id}`)
    .then((res) => res.json())
    .then((res) => {
      Object.assign(product, res);
      originalProductName.value = res.name;
    });
});
</script>

<template>
  <div>
    <h1 v-text="originalProductName"></h1>
    <form @submit.prevent="saveProduct">
      <label>
        <span v-text="t('Name')"></span>
        <input type="text" v-model="product.name" />
      </label>
      <label>
        <span v-text="t('Price')"></span>
        <input type="number" v-model="product.price" />
      </label>
      <label>
        <span v-text="t('Description')"></span>
        <textarea v-model="product.description"></textarea>
      </label>
      <button
        type="submit"
        class="btn-normal primary"
        :disabled="saving"
        v-text="t('Save')"
      ></button>
    </form>
  </div>
</template>

<style scoped>
label {
  display: flex;
  min-height: 32px;
  padding: 12px 0;
}

label > span {
  display: inline-block;
  width: 192px;
  flex-shrink: 0;
  line-height: 2em;
}

@media (max-width: 960px) {
  label {
    flex-direction: column;
  }
}

input[type="text"],
input[type="number"],
input[type="email"],
textarea {
  font-size: 1em;
  padding: 6px;
  border: 1px solid darkgray;
  border-radius: 4px;
}

textarea {
  box-sizing: border-box;
  min-height: 200px;
  width: 100%;
  font: 1em sans-serif;
}
</style>

<i18n lang="yaml">
en:
  Description: Description
  Name: Name
  New Product: New Product
  Price: Price
  Save: Save
zh-CN:
  Description: 描述
  Name: 名称
  New Product: 新商品
  Price: 价格
  Save: 保存
</i18n>
