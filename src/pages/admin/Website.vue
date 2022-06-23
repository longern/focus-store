<script setup lang="ts">
import md5 from "md5";
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { Site } from "@/interfaces";

const coverImage = ref(null);
const logo = ref(null);
const site = reactive({} as Site);
const { t } = useI18n();

function saveSite() {
  fetch("/api/admin/site", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
}

async function uploadImage(imageInput: HTMLInputElement) {
  const file = imageInput.files?.[0];
  if (!file) return;

  const md5Hash = md5(new Uint8Array(await file.arrayBuffer()));
  const response = await fetch(`/api/assets/${md5Hash}`, {
    method: "PUT",
    body: file,
  });

  imageInput.files = null;
  return response.url;
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
    .then((res) => site[key].src = res.url);

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
      <label>
        <span v-text="t('Title')"></span>
        <input type="text" v-model="site.title" />
      </label>
      <label>
        <span v-text="t('Logo')"></span>
        <div>
          <img :src="site.logo" height="64" width="64" />
          <input
            ref="logo"
            type="file"
            accept="image/*"
            hidden
            @change="async () => (site.logo = await uploadImage(logo))"
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
</style>

<i18n lang="yaml">
en:
  About us: About us
  Cover image: Cover image
  Save: Save
  Title: Title
  Website: Website
zh-CN:
  About us: 关于我们
  Cover image: 封面图片
  Save: 保存
  Title: 标题
  Website: 网站
</i18n>
