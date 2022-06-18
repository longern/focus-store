<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { createI18n } from "vue-i18n";

import router from "@/router";
import Sidebar from "./Sidebar.vue";

const app = getCurrentInstance().appContext.app;

app.use(router);
app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);
</script>

<template>
  <Sidebar></Sidebar>
  <main>
    <div class="container"><router-view></router-view></div>
  </main>
</template>

<style>
.container {
  width: 1200px;
  margin: 12px auto;
}
</style>
