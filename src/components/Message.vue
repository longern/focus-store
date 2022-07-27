<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);

function show() {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
}

defineExpose({
  show,
});
</script>

<template>
  <Teleport v-if="visible" to="body">
    <div class="message-modal">
      <div class="message">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style>
.message-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: none;
}

.message {
  padding: 16px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
