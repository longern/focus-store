<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { mdiPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

import { Product } from "@/interfaces";
import { uploadImage } from "@/utils";

const props = defineProps({
  id: String,
});

const imageInput = ref<HTMLInputElement>(null);
const originalProductName = ref("\xA0");
const product = reactive({} as Product);
const saving = ref(false);

const { t } = useI18n();
const router = useRouter();

async function saveProduct() {
  saving.value = true;

  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const productId: string = (<Product>await response.json()).id;
  if (props.id === "new") {
    router.push(`/products/${productId}`);
  }
  originalProductName.value = product.name;

  saving.value = false;
}

onBeforeMount(() => {
  if (!props.id || props.id === "new") {
    originalProductName.value = t("New Product");
    return;
  }

  fetch(`/api/products/${props.id}`)
    .then((res) => res.json())
    .then((res: Product) => {
      Object.assign(product, res);
      originalProductName.value = res.name;
    });
});
</script>

<template>
  <div>
    <h1 v-text="originalProductName"></h1>
    <form @submit.prevent="saveProduct">
      <label class="form-label">
        <span v-text="t('Name')"></span>
        <input type="text" v-model="product.name" required />
      </label>
      <label class="form-label">
        <span v-text="t('Price')"></span>
        <input type="number" v-model="product.price" required />
      </label>
      <div class="form-label">
        <span v-text="t('Images')"></span>
        <div class="images">
          <template v-for="image in product.images">
            <img :src="image" height="100" width="100" />
          </template>
          <label class="add-image">
            <SvgIcon type="mdi" :path="mdiPlus" size="100" />
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              hidden
              @change="
                async () => {
                  product.images = product.images || [];
                  product.images.push(await uploadImage(imageInput));
                }
              "
            />
          </label>
        </div>
      </div>
      <label class="form-label">
        <span v-text="t('Description')"></span>
        <textarea v-model="product.description"></textarea>
      </label>
      <button
        type="submit"
        class="btn-normal primary"
        :disabled="saving"
        v-text="t('Save')"
      ></button>
    </form>
  </div>
</template>

<style scoped>
.form-label {
  display: flex;
  min-height: 32px;
  padding: 12px 0;
}

.form-label > span {
  display: inline-block;
  width: 192px;
  flex-shrink: 0;
  line-height: 2em;
}

@media (max-width: 960px) {
  .form-label {
    flex-direction: column;
  }
}

input[type="text"],
input[type="number"],
input[type="email"],
textarea {
  font-size: 1em;
  padding: 6px;
  border: 1px solid darkgray;
  border-radius: 4px;
}

textarea {
  box-sizing: border-box;
  min-height: 200px;
  width: 100%;
  font: 1em sans-serif;
}

.images > img {
  margin-right: 8px;
  border-radius: 4px;
}

.add-image {
  display: inline-flex;
  border: 1px solid darkgray;
  border-radius: 4px;
  color: #666;
  pointer-events: initial;
  cursor: pointer;
}
</style>

<i18n lang="yaml">
en:
  Description: Description
  Images: Images
  Name: Name
  New Product: New Product
  Price: Price
  Save: Save
zh-CN:
  Description: 描述
  Images: 图片
  Name: 名称
  New Product: 新商品
  Price: 价格
  Save: 保存
</i18n>
