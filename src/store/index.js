import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    recipeId: 1
  },
  getters: {
    recipes(state){
      return state.recipes;
    }
  },
  mutations: {
    onRecipeAdd(state, title) {
      let recipe = {};
      recipe.id = state.recipeId++;
      recipe.title = title;
      recipe.thumbnailUrl = "https://d1f5hsy4d47upe.cloudfront.net/e2/e2c42a74de4dcb8e9eace7f55e956757_t.jpeg";
      recipe.userId = 1;
      
      state.recipes.push(recipe);
    }
  },
  actions: {},
  modules: {}
});
