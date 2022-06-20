<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiCart, mdiTwitter } from "@mdi/js";

const props = defineProps({
  logo: String,
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
      <div style="display: flex">
        <div style="flex-grow: 1"></div>
        <button class="btn-icon">
          <SvgIcon type="mdi" :path="mdiCart"></SvgIcon>
        </button>
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
