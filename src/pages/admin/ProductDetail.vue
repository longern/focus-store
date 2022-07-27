<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import Message from "@/components/Message.vue";
import { Product } from "@/interfaces";
import { uploadImage } from "@/utils";

const props = defineProps({
  id: String,
});

const descriptionEditor = ref<InstanceType<typeof QuillEditor>>(null);
const imageInput = ref<HTMLInputElement>(null);
const message = ref<InstanceType<typeof Message> | null>(null);
const originalProductName = ref("\xA0");
const product = reactive({ description: "" } as Product);
const saving = ref(false);

const { t } = useI18n();
const router = useRouter();

async function saveProduct() {
  saving.value = true;

  const response = await fetch("/admin/api/products", {
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

  message.value.show();
  saving.value = false;
}

onBeforeMount(() => {
  if (!props.id || props.id === "new") {
    originalProductName.value = t("New Product");
    return;
  }

  fetch(`/api/products/${props.id}`)
    .then((res) => res.json())
    .then(async (res: Product) => {
      Object.assign(product, res);
      originalProductName.value = res.name;

      // `v-model:content` is actually not two-way binding,
      // so we need to manually update the editor content.
      if (!descriptionEditor.value)
        await new Promise((resolve) => onMounted(() => resolve(null)));
      descriptionEditor.value.setHTML(product.description);
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
          <template v-for="(image, index) in product.images">
            <img
              :src="image"
              height="100"
              width="100"
              @contextmenu.prevent="product.images.splice(index, 1)"
            />
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
      <div class="form-label">
        <span v-text="t('Description')"></span>
        <div style="display: flex; flex-direction: column">
          <QuillEditor
            ref="descriptionEditor"
            v-model:content="product.description"
            contentType="html"
            toolbar="full"
          ></QuillEditor>
        </div>
      </div>
      <label class="form-label">
        <span v-text="t('Category')"></span>
        <input type="text" v-model="product.category" />
      </label>
      <div class="form-label">
        <span v-text="t('Options')"></span>
        <div>
          <button
            class="btn-normal primary"
            @click.prevent="
              (product.options ||= []).push({ name: '', values: [] })
            "
          >
            <span v-text="t('Add Option')"></span>
          </button>
          <div v-for="option in product.options">
            <details>
              <summary>
                <input type="text" v-model="option.name" />
              </summary>
              <button
                class="btn-normal primary"
                @click.prevent="option.values.push({ text: '' })"
              >
                <span v-text="t('Add Option Value')"></span>
              </button>
              <div v-for="value in option.values" class="value-text">
                <input type="text" v-model="value.text" />
                <input
                  type="text"
                  v-model="value.priceModifier"
                  :placeholder="t('Price Modifier')"
                />
              </div>
            </details>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn-normal primary"
        :disabled="saving"
        v-text="t('Save')"
      ></button>
    </form>
    <Message ref="message">
      <span v-text="t('Saved')"></span>
    </Message>
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

textarea {
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

summary {
  margin: 4px 0;
}

.value-text {
  margin: 4px 0;
}
</style>

<i18n lang="yaml">
en:
  Add Option: Add Option
  Category: Category
  Description: Description
  Images: Images
  Name: Name
  New Product: New Product
  Options: Options
  Price: Price
  Save: Save
  Saved: Saved
zh-CN:
  Add Option: 添加选项
  Category: 分类
  Description: 描述
  Images: 图片
  Name: 名称
  New Product: 新商品
  Options: 选项
  Price: 价格
  Save: 保存
  Saved: 保存成功
</i18n>
