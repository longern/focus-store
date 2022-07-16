<script setup lang="ts">
defineProps({
  item: Object,
});
</script>

<template>
  <div class="order-item">
    <div class="order-item-image">
      <img :src="item.image" width="100" height="100" />
    </div>
    <div class="order-item-text">
      <div class="order-item-name">{{ item.name }}</div>
      <div style="display: flex">
        <div class="order-item-details">
          <div class="order-item-choices">
            <span v-for="value in item.choices" v-text="value"></span>
            <span v-text="'\xA0'"></span>
          </div>
          <div class="order-item-price">
            <span class="currency-prefix"></span>
            <span v-text="item.unitPrice"></span>
          </div>
        </div>
        <div class="order-item-quantity" @click.prevent>
          <span v-text="`x${item.quantity}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.order-item {
  paint-order: fill;
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
}

.order-item-image {
  flex-shrink: 0;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.order-item-text {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: space-evenly;
}

.order-item-details {
  flex-grow: 1;
  min-width: 0;
}

.order-item-name {
  display: -webkit-box;
  line-height: 1.2em;
  min-height: 2.4em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-choices {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-quantity {
  height: 100%;
}
</style>
