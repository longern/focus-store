<script setup lang="ts">
import { ref, onMounted } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiAccount,
  mdiCart,
  mdiFormatListBulleted,
  mdiTwitter,
} from "@mdi/js";

import { cart, isMobile, showSidebar } from "@/composables/states";

const props = defineProps({
  logo: String,
  rootCategory: Object,
});

const mounted = ref(false);

onMounted(() => {
  // Force update the cart count on mount
  mounted.value = true;
  isMobile.value = window.innerWidth <= 960;
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth <= 960;
  });
});
</script>

<template>
  <nav>
    <a href="/">
      <img class="logo" :src="props.logo" width="72" height="72" />
    </a>
    <button
      v-if="isMobile"
      class="btn-icon toggle-siderbar"
      @click="showSidebar = !showSidebar"
    >
      <SvgIcon type="mdi" :path="mdiFormatListBulleted" />
    </button>
    <div style="flex-grow: 1"></div>

    <component
      :is="isMobile ? 'aside' : 'div'"
      :class="['category-menu', showSidebar ? null : 'hide']"
    >
      <a
        v-for="cata in rootCategory.children"
        :href="`/categories/${cata.name}`"
        v-text="cata.name"
      ></a>
    </component>

    <div style="flex-grow: 1"></div>
    <div>
      <div class="social-media">
        <div style="flex-grow: 1"></div>
        <button class="btn-icon">
          <SvgIcon type="mdi" :path="mdiTwitter"></SvgIcon>
        </button>
      </div>
      <div style="display: flex; align-items: center">
        <div style="flex-grow: 1"></div>
        <div id="navExtra"></div>
        <a href="/cart">
          <button class="btn-icon">
            <span :key="mounted && cart.length" :badge="cart.length || null">
              <SvgIcon type="mdi" :path="mdiCart"></SvgIcon>
            </span>
          </button>
        </a>
        <a href="/profile">
          <button class="btn-icon">
            <SvgIcon type="mdi" :path="mdiAccount"></SvgIcon>
          </button>
        </a>
      </div>
    </div>
  </nav>
</template>

<style>
nav,
aside.category-menu {
  flex-shrink: 0;
  display: flex;
  background-color: #333;
  color: white;
}

.category-menu {
  display: flex;
  align-items: flex-end;
}

.category-menu > a {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  transition: background-color 0.2s ease-in-out;
}

.category-menu > a:hover {
  background-color: #444;
}

aside.category-menu {
  position: fixed;
  top: 0;
  left: 0;
  transition: left 0.2s ease-in-out;
  bottom: 48px;
  width: 100%;
  z-index: 3;
  flex-direction: column;
}

aside.category-menu.hide {
  left: -100%;
}

aside.category-menu > a {
  box-sizing: border-box;
  width: 100%;
}

@media (max-width: 960px) {
  /* Hide server-rendered category menu on mobile */
  div.category-menu {
    display: none;
  }
}

nav > a {
  display: inline-flex;
}

.social-media {
  display: flex;
}

.social-media .btn-icon {
  padding: 2px;
}

.social-media .btn-icon > svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 960px) {
  nav .logo {
    width: 48px;
    height: 48px;
  }

  .social-media {
    display: none;
  }
}
</style>
