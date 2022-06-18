import { createRouter, createWebHashHistory } from "vue-router";

import Products from "@/pages/admin/Products.vue";
import Website from "@/pages/admin/Website.vue";

let router = null;
if (typeof window !== "undefined") {
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { name: "website", path: "/website", component: Website },
      { name: "products", path: "/products", component: Products },
    ],
  });
}

export default router;
