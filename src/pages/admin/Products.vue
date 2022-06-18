<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <h1 v-text="t('Products')"></h1>
  </div>
</template>
