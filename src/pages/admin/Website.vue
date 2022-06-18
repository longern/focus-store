<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

const site = reactive(<Record<string, any>>{});
const { t } = useI18n();

onBeforeMount(() => {
  fetch("/api/site")
    .then((res) => res.json())
    .then((res) => {
      Object.assign(site, res);
    });
});
</script>

<template>
  <div>
    <h1 v-text="t('Website')"></h1>
    <form>
      <label>
        <span v-text="t('Title')"></span>
        <input type="text" v-model="site.title" />
      </label>
      <label>
        <span v-text="t('Cover Image')"></span>
        <input type="file" />
      </label>
    </form>
  </div>
</template>

<style>
label {
  display: block;
  min-height: 32px;
  padding: 12px 0;
}

label > span {
  display: inline-block;
  width: 192px;
}

input[type="text"],
input[type="number"],
input[type="email"] {
  font-size: 1em;
  padding: 6px;
  border: 1px solid darkgray;
  border-radius: 4px;
}
</style>

<i18n lang="yaml">
en:
  Cover Image: Cover Image
  Title: Title
  Website: Website
zh-CN:
  Cover Image: 封面图片
  Title: 标题
  Website: 网站
</i18n>
