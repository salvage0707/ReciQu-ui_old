import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import UserRecipes from "../views/user/recipes/UserRecipes.vue";
import UserNewRecipe from "../views/user/recipes/UserNewRecipe.vue";
import { getInstance } from "@/lib/auth";
import { userInitGuard, authGuard } from "./guards";

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
    path: "/users/:user_id/recipes",
    name: "UserRecipes",
    component: UserRecipes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:user_id/recipe/new",
    name: "UserNewRecipe",
    component: UserNewRecipe,
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
  const authService = getInstance();
  let executedNext = false;

  // next()を実行していない場合に処理を実行
  const executeNextCheck = (func) => {
    if (!executedNext) {
      executedNext = func();
    }
  }

  // チェック処理の定義
  const checkFunc = () => {
    executeNextCheck(() => userInitGuard(to, next, authService));
    executeNextCheck(() => authGuard(to, next, authService));
    executeNextCheck(() => next());
  }

  if (!authService.loading) {
    return checkFunc();
  }

  authService.$watch("loading", loading => {
    if (loading === false) {
      return checkFunc();
    }
  });
})

export default router;
