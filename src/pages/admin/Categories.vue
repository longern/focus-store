<script setup lang="ts">
import { reactive } from "vue";
import { Category } from "@/interfaces";
import { mdiClose } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { useI18n } from "vue-i18n";

const categories = reactive(<Array<Category>>[]);
const { t } = useI18n();

function saveCategories() {
  fetch("/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "",
      children: categories.filter((category) => category.name),
    }),
  });
}
</script>

<template>
  <h1 v-text="t('Categories')"></h1>
  <form @submit.prevent="saveCategories">
    <div>
      <button
        class="btn-normal primary"
        @click="categories.push({ name: '', children: [] })"
      >
        <span v-text="t('Add Category')"></span>
      </button>
    </div>
    <div v-for="(category, index) in categories" class="category">
      <input type="text" v-model="category.name" />
      <button @click="categories.splice(index, 1)">
        <SvgIcon type="mdi" :path="mdiClose"></SvgIcon>
      </button>
    </div>
    <div>
      <button type="submit" class="btn-normal primary">
        <span v-text="t('Save')"></span>
      </button>
    </div>
  </form>
</template>

<style>
form > * {
  margin-bottom: 12px;
}

.category {
  display: flex;
  align-items: center;
}
</style>

<i18n lang="yaml">
en:
  Add Category: Add Category
  Categories: Categories
  Save: Save
zh-CN:
  Add Category: 添加分类
  Categories: 分类
  Save: 保存
</i18n>
