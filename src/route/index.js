import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import Cart from "../components/cart/Cart.vue";
import Checkout from "../components/cart/Checkout.vue";
import Navigation from "../components/nav/Navigation.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/*webpackChunkName="Login"*/ "@/components/login/login.vue"),
  },

  {
    path: "/",
    redirect: "/home",
  },
  { path: "/:pathMatch(.*)*", component: Navigation },
  {
    path: "/productdetails/:id",
    name: "productdetails",
    component: () =>
      import(
        /*webpackChunkName="Details"*/ "@/components/home/productdetails.vue"
      ),
  },

  {
    path: "/delivery",
    name: "delivery",
    component: Checkout,
  },

  {
    path: "/navigation",
    name: "navigation",
    component: Navigation,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/mycart",
        name: "mycart",
        component: Cart,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
