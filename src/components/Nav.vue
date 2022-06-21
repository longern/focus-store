<script setup lang="ts">
import { ref, onMounted } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiCart, mdiTwitter } from "@mdi/js";

import { cart } from "@/composables/states";

const props = defineProps({
  logo: String,
});

const mounted = ref(false);

onMounted(() => {
  // Force update the cart count on mount
  mounted.value = true;
});
</script>

<template>
  <nav>
    <a href="/">
      <img class="logo" :src="props.logo" width="72" height="72" />
    </a>
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
        <button class="btn-icon">
          <SvgIcon type="mdi" :path="mdiAccount"></SvgIcon>
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
nav {
  flex-shrink: 0;
  display: flex;
  background-color: #333;
  color: white;
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
