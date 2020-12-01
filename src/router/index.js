import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import RecipeForm from "../views/RecipeForm.vue";
import { getInstance } from "@/lib/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/recipe/add",
    name: "RecipeForm",
    component: RecipeForm,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 認証チェック
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authService = getInstance();

    const fn = () => {
      if (authService.isAuthenticated) {
        return next();
      }
  
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    };
  
    if (!authService.loading) {
      return fn();
    }
  
    authService.$watch("loading", loading => {
      if (loading === false) {
        return fn();
      }
    });
  } else {
    next(); 
  }
})

export default router;
