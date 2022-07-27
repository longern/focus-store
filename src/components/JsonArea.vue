<script setup lang="ts">
import { ref } from "vue";

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const invalidJson = ref(false);
const textarea = ref(null as HTMLTextAreaElement | null);

function handleChange() {
  const target = textarea.value;
  try {
    emit("update:modelValue", JSON.parse(target.value));
    invalidJson.value = false;
  } catch (e) {
    invalidJson.value = true;
  }
}
</script>

<template>
  <textarea
    :value="JSON.stringify(modelValue, null, 2)"
    ref="textarea"
    :class="['json-area', { invalid: invalidJson }]"
    @change="handleChange"
  ></textarea>
</template>

<style>
.json-area.invalid {
  border-color: red;
}
</style>
