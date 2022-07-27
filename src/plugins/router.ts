import { createRouter, createWebHashHistory, Router } from "vue-router";

import Categories from "@/pages/admin/Categories.vue";
import Orders from "@/pages/admin/Orders.vue";
import ProductDetail from "@/pages/admin/ProductDetail.vue";
import Products from "@/pages/admin/Products.vue";
import Website from "@/pages/admin/Website.vue";

let router: Router = null;
if (typeof window !== "undefined") {
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { name: "home", path: "/", redirect: "/website" },
      { name: "website", path: "/website", component: Website },
      { name: "products", path: "/products", component: Products },
      { name: "categories", path: "/categories", component: Categories },
      { name: "orders", path: "/orders", component: Orders },
      {
        name: "productDetail",
        path: "/products/:id",
        component: ProductDetail,
        props: true,
      },
    ],
  });
}

export default router;
