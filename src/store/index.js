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
      
      state.recipes.push(recipe);
    }
  },
  actions: {},
  modules: {}
});
