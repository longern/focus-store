<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { createI18n } from "vue-i18n";

import Sidebar from "./Sidebar.vue";

getCurrentInstance().appContext.app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);
</script>

<template>
  <Sidebar></Sidebar>
  <main></main>
</template>
