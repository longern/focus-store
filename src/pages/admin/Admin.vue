<script setup lang="ts">
import { getCurrentInstance, provide, ref } from "vue";
import { createI18n } from "vue-i18n";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";

import router from "@/router";
import Sidebar from "./Sidebar.vue";

const app = getCurrentInstance().appContext.app;
const isMobile = window.innerWidth <= 960;
const showSidebar = ref(!isMobile);
provide("showSidebar", showSidebar);

app.use(router);
app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);
</script>

<template>
  <nav v-if="isMobile">
    <button class="btn-icon" @click="showSidebar = !showSidebar">
      <SvgIcon type="mdi" :path="mdiMenu"></SvgIcon>
    </button>
  </nav>
  <main>
    <Sidebar :class="showSidebar ? null : 'hide'"></Sidebar>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
}

nav {
  background-color: #333;
  color: white;
}

.container {
  width: 100%;
  padding: 12px;
}

@media (max-width: 960px) {
  aside {
    position: fixed;
    height: 100%;
    left: 0;
    transition: left 0.2s ease-in-out;
  }

  aside.hide {
    left: -100%;
  }
}

@media not all and (max-width: 960px) {
  html > body {
    flex-direction: row;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
  }
}

main {
  overflow: auto;
}
</style>
