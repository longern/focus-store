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
      <div class="form-group">
        <label for="site-title">
          <span v-text="t('Title')"></span>
          <input
            type="text"
            class="form-control"
            id="site-title"
            v-model="site.title"
          />
        </label>
      </div>
    </form>
  </div>
</template>

<i18n lang="yaml">
en:
  Title: Title
  Website: Website
zh-CN:
  Title: 标题
  Website: 网站
</i18n>
