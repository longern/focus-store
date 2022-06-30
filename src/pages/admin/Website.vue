<script setup lang="ts">
// @ts-ignore
import md5 from "md5";
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import MenuTab from "@/components/MenuTab.vue";
import MenuTabs from "@/components/MenuTabs.vue";
import { Site } from "@/interfaces";
import { uploadImage } from "@/utils";

const coverImage = ref(null);
const site = reactive({} as Site);
const { t } = useI18n();

function saveSite() {
  fetch("/admin/api/site", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
}

function uploadLazyImage(imageInput: HTMLInputElement, key: string) {
  const file = imageInput.files?.[0];
  if (!file) return;

  site[key] = {};

  file
    .arrayBuffer()
    .then((buffer) =>
      fetch(`/api/assets/${md5(new Uint8Array(buffer))}`, {
        method: "PUT",
        body: file,
      })
    )
    .then((res) => (site[key].src = res.url));

  // Resize image to get thumbnail
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width / 10;
    canvas.height = image.height / 10;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    site[key].lazySrc = canvas.toDataURL("image/jpeg", 0.2);
  };
  image.src = URL.createObjectURL(file);

  imageInput.files = null;
}

onBeforeMount(() => {
  fetch("/api/site")
    .then((res) => res.json())
    .then((res) => {
      Object.assign(site, res);
    });
});
</script>

<template>
  <div>
    <h1 v-text="t('Website')"></h1>
    <form @submit.prevent="saveSite">
      <MenuTabs>
        <MenuTab :title="t('Cover')">
          <label>
            <span v-text="t('Title')"></span>
            <input type="text" v-model="site.title" />
          </label>
          <label>
            <span v-text="t('Logo')"></span>
            <div>
              <img :src="site.logo" height="64" width="64" />
              <input
                type="file"
                accept="image/*"
                hidden
                @change="async (event) => (site.logo = await uploadImage(event.target as HTMLInputElement))"
              />
            </div>
          </label>
          <label>
            <span v-text="t('Cover image')"></span>
            <div>
              <img
                :src="site.coverImage?.src || site.coverImage?.lazySrc"
                height="108"
                width="192"
              />
              <input
                ref="coverImage"
                type="file"
                accept="image/*"
                hidden
                @change="uploadLazyImage(coverImage, 'coverImage')"
              />
            </div>
          </label>
          <label>
            <span v-text="t('About us')"></span>
            <textarea v-model="site.aboutUs"></textarea>
          </label>
          <button
            type="submit"
            class="btn-normal primary"
            v-text="t('Save')"
          ></button>
        </MenuTab>
        <MenuTab :title="t('Testimonials')">
          <div v-for="(testimonial, index) in site.testimonials">
            <label>
              <span v-text="t('Avatar')"></span>
              <div>
                <img :src="testimonial.avatar" height="64" width="64" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  @change="async (event) => (testimonial.avatar = await uploadImage(event.target as HTMLInputElement))"
                />
              </div>
            </label>
            <label>
              <span v-text="t('Name')"></span>
              <input type="text" v-model="testimonial.name" />
            </label>
            <label>
              <span v-text="t('Caption')"></span>
              <input type="text" v-model="testimonial.caption" />
            </label>
            <label>
              <span v-text="t('Quote')"></span>
              <textarea v-model="testimonial.quote"></textarea>
            </label>
            <button
              type="button"
              class="btn-normal danger"
              @click="site.testimonials.splice(index, 1)"
              v-text="t('Delete')"
            ></button>
          </div>
          <button
            type="button"
            class="btn-normal primary"
            @click="
              (site.testimonials ||= []).push({
                avatar: null,
                name: null,
                caption: null,
                quote: null,
              })
            "
            v-text="t('Add testimonial')"
          ></button>
        </MenuTab>
        <MenuTab :title="t('Global settings')">
          <label>
            <span v-text="t('Currency symbol')"></span>
            <input type="text" v-model="site.currencyPrefix" />
          </label>
        </MenuTab>
      </MenuTabs>
    </form>
  </div>
</template>

<style scoped>
label {
  display: flex;
  min-height: 32px;
  padding: 12px 0;
}

label > span {
  display: inline-block;
  width: 192px;
  flex-shrink: 0;
  line-height: 2em;
}

@media (max-width: 960px) {
  label {
    flex-direction: column;
  }
}

textarea {
  box-sizing: border-box;
  min-height: 200px;
  width: 100%;
  font: 1em sans-serif;
}
</style>

<i18n lang="yaml">
en:
  About us: About us
  Add testimonial: Add testimonial
  Avatar: Avatar
  Caption: Caption
  Cover: Cover
  Cover image: Cover image
  Currency symbol: Currency symbol
  Delete: Delete
  Global settings: Global settings
  Logo: Logo
  Name: Name
  Quote: Quote
  Save: Save
  Testimonials: Testimonials
  Title: Title
  Website: Website
zh-CN:
  About us: 关于我们
  Add testimonial: 添加客户评价
  Avatar: 头像
  Caption: 作者描述
  Cover: 封面
  Cover image: 封面图片
  Currency symbol: 货币符号
  Delete: 删除
  Global settings: 全局设置
  Logo: Logo
  Name: 姓名
  Quote: 评论
  Save: 保存
  Testimonials: 客户评价
  Title: 标题
  Website: 网站
</i18n>
