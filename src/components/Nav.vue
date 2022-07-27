<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiCart, mdiFormatListBulleted } from "@mdi/js";

import { cart, isMobile, showSidebar } from "@/composables/states";
import { i18n } from "@/plugins/i18n";

const props = defineProps({
  logo: String,
  rootCategory: Object,
});

const mounted = ref(false);
const t = (text: string) =>
  mounted.value ? i18n(getCurrentInstance()).t(text) : text;

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
    <div style="display: flex; flex-grow: 1; flex-basis: 0">
      <button
        aria-label="Toggle Sidebar"
        class="btn-icon toggle-siderbar"
        @click="showSidebar = !showSidebar"
      >
        <SvgIcon type="mdi" :path="mdiFormatListBulleted" />
      </button>
      <a href="/" style="display: inline-flex" aria-label="Home">
        <img class="logo" :src="props.logo" alt="logo" width="72" height="72" />
      </a>
    </div>

    <div style="display: flex">
      <div style="flex-grow: 1"></div>
      <component
        :is="isMobile ? 'aside' : 'div'"
        :class="['category-menu', showSidebar ? null : 'hide']"
      >
        <a
          v-for="cata in rootCategory.children"
          :href="`/products?category=${cata.name}`"
          v-text="cata.name"
        ></a>
        <a href="/products" v-text="t('All products')"></a>
      </component>
    </div>

    <div style="flex-grow: 1; flex-basis: 0">
      <div class="social-media">
        <div style="flex-grow: 1"></div>
        <div id="socialIcons"></div>
      </div>
      <div style="display: flex; align-items: center">
        <div style="flex-grow: 1"></div>
        <div id="navExtra"></div>
        <a href="/cart">
          <button class="btn-icon" aria-label="Cart">
            <span :key="mounted && cart.length" :badge="cart.length || null">
              <SvgIcon type="mdi" :path="mdiCart"></SvgIcon>
            </span>
          </button>
        </a>
        <a href="/profile">
          <button class="btn-icon" aria-label="Profile">
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

.toggle-siderbar {
  display: none;
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
  width: 100%;
}

@media (max-width: 960px) {
  /* Hide server-rendered category menu on mobile */
  div.category-menu {
    display: none;
  }
}

nav .btn-icon {
  color: white !important;
}

.social-media {
  display: flex;
  height: 24px;
}

.social-media .btn-icon {
  padding: 2px;
}

.social-media .btn-icon > svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 960px) {
  .toggle-siderbar {
    display: flex;
  }

  nav .logo {
    width: 48px;
    height: 48px;
  }

  .social-media {
    display: none;
  }
}
</style>

<i18n lang="yaml">
en:
  All products: All products
zh-CN:
  All products: 全部商品
</i18n>
