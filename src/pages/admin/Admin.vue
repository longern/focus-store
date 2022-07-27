<script setup lang="ts">
import { getCurrentInstance, provide, ref, watch } from "vue";
import { createI18n } from "vue-i18n";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";

import router from "@/plugins/router";
import Sidebar from "./Sidebar.vue";

const app = getCurrentInstance().appContext.app;
const isMobile = ref(window.innerWidth <= 960);
const showSidebar = ref(!isMobile.value);
provide("showSidebar", showSidebar);

app.use(router);
app.use(
  createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
  })
);

watch(router.currentRoute, () => {
  showSidebar.value = false;
});

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 960;
});
</script>

<template>
  <div class="admin">
    <nav v-if="isMobile">
      <button class="btn-icon" @click="showSidebar = !showSidebar">
        <SvgIcon type="mdi" :path="mdiMenu"></SvgIcon>
      </button>
    </nav>
    <div style="display: flex; min-height: 0; height: 100%">
      <Sidebar :class="showSidebar ? null : 'hide'"></Sidebar>
      <main>
        <div class="container">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.admin {
  display: contents;
}

.admin main {
  overflow: auto;
}

.admin nav {
  background-color: #333;
  color: white;
}

.admin .container {
  width: 100%;
  padding: 12px;
}

@media (max-width: 960px) {
  .admin aside {
    position: fixed;
    height: 100%;
    left: 0;
    transition: left 0.2s ease-in-out;
  }

  .admin aside.hide {
    left: -100%;
  }
}
</style>
