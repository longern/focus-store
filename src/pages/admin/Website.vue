<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { Site } from "@/interfaces";

const site = reactive({} as Site);
const { t } = useI18n();

function saveSite() {
  fetch("/api/admin/site", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
}

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
    <form @submit.prevent="saveSite">
      <label>
        <span v-text="t('Title')"></span>
        <input type="text" v-model="site.title" />
      </label>
      <label>
        <span v-text="t('Logo')"></span>
        <div>
          <img :src="site.logo" height="64" width="64" />
          <input type="file" hidden />
        </div>
      </label>
      <label>
        <span v-text="t('Cover image')"></span>
        <div>
          <img :src="site.coverImage" height="108" width="192" />
          <input type="file" hidden />
        </div>
      </label>
      <label>
        <span v-text="t('About us')"></span>
        <textarea v-model="site.aboutUs"></textarea>
      </label>
      <button
        type="submit"
        class="btn-normal primary"
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
  About us: About us
  Cover image: Cover image
  Save: Save
  Title: Title
  Website: Website
zh-CN:
  About us: 关于我们
  Cover image: 封面图片
  Save: 保存
  Title: 标题
  Website: 网站
</i18n>
