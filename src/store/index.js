import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    recipeId: 1
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    nextRecipeId(state) {
      return state.recipeId + 1;
    },
    findRecipe: (state) => (id) => {
      return state.recipes.find(recipe => recipe.id === id );
    }
  },
  mutations: {
    // title, description, youtubeVideoId, userId
    addRecipe(state, payload) {
      let recipe = {};
      recipe.id = state.recipeId++;
      recipe.title = payload.title;
      recipe.description = payload.description;
      recipe.youtubeVideoId = payload.youtubeVideoId;
      recipe.userId = payload.userId;

      state.recipes.push(recipe);
    }
  },
  actions: {},
  modules: {}
});
