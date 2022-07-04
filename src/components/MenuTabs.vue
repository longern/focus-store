<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  contentPadding: {
    type: Boolean,
    default: true,
  },
});

const activeTab = ref(0);
const showContent = ref(false);
</script>

<template>
  <div class="menu-tabs">
    <div class="menu-tabs-titles">
      <template v-for="(node, index) in $slots.default()">
        <div
          v-if="node.props?.title"
          :class="['menu-tabs-title', { active: activeTab === index }]"
          @click="
            activeTab = index;
            showContent = true;
          "
        >
          <span class="menu-tabs-title-text" v-text="node.props.title"></span>
        </div>
      </template>
    </div>
    <div
      :class="[
        'menu-tabs-content',
        { show: showContent, 'content-padding': props.contentPadding },
      ]"
    >
      <slot />
      <div class="menu-tabs-content-close" @click="showContent = false">❌</div>
    </div>
    <component is="style">
      .menu-tabs-content>.menu-tab:not(:nth-of-type({{ activeTab + 1 }}))
      {display: none;}
    </component>
  </div>
</template>

<style>
.menu-tabs {
  display: flex;
}

.menu-tabs-titles {
  width: 256px;
  margin-right: 24px;
  flex-shrink: 0;
}

.menu-tabs-title {
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 4px;
  cursor: pointer;
  transition: backdrop-filter 0.2s ease-in-out;
}

.menu-tabs-title.active {
  background-color: #ddd;
}

.menu-tabs-title:hover {
  backdrop-filter: brightness(0.95);
}

.menu-tabs-title-text {
  padding: 0 12px;
}

.menu-tabs-content {
  flex-grow: 1;
  position: relative;
}

.menu-tabs-content.content-padding {
  padding: 12px;
}

.menu-tabs-content-close {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
}

@media (max-width: 960px) {
  .menu-tabs-titles {
    width: 100%;
    margin-right: 0;
  }

  .menu-tabs-content {
    position: fixed;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 1;
    background-color: whitesmoke;
    transition: left 0.2s ease-in-out;
  }

  .menu-tabs-content.show {
    left: 0;
  }

  .menu-tabs-content-close {
    display: flex;
  }
}
</style>
