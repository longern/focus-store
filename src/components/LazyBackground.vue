<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  src: String,
  lazySrc: String,
});

const loaded = ref(!props.lazySrc);

onMounted(() => {
  if (props.lazySrc) {
    const image = new Image();
    image.onload = () => {
      loaded.value = true;
    };
    image.src = props.src;
  }
});
</script>

<template>
  <div class="lazy-background">
    <div
      v-if="!loaded"
      class="lazy"
      :style="`background-image: url(${props.lazySrc})`"
    ></div>
    <div v-if="loaded" :style="`background-image: url(${src})`"></div>
  </div>
</template>

<style>
.lazy-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -100;
}

.lazy-background > div {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.lazy-background > div.lazy::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}
</style>
