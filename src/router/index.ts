import { route } from "quasar/wrappers";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "landing",
    component: () =>
      import(/* webpackChunkName: "Landing Layout" */ "layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/Auth/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/Auth/Register.vue"),
      },
    ],
  },
  {
    path: "/users",
    name: "quotes",
    component: () =>
      import(
        /* webpackChunkName: "Landing Layout" */ "layouts/UsersLayout.vue"
      ),
    children: [
      {
        path: "quote",
        name: "quote",
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/Auth/Quote.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/Auth/User.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
