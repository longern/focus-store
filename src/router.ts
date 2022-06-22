import { createRouter, createWebHashHistory, Router } from "vue-router";

import Categories from "@/pages/admin/Categories.vue";
import Products from "@/pages/admin/Products.vue";
import Website from "@/pages/admin/Website.vue";

let router: Router = null;
if (typeof window !== "undefined") {
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { name: "website", path: "/website", component: Website },
      { name: "products", path: "/products", component: Products },
      { name: "categories", path: "/categories", component: Categories },
    ],
  });
}

export default router;
