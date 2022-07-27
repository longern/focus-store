<script setup lang="ts">
defineProps({ title: String });
</script>

<template>
  <div class="menu-tab">
    <slot />
  </div>
</template>
