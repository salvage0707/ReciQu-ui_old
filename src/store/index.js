import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    authStatus: false
  },
  getters: {
    user(state){
      return state.user;
    },
    isLogedin(state) {
      return state.authStatus;
    }
  },
  mutations: {
    onUserChanged(state, user) {
      state.user = user;
    },
    onAuthStatusChanged(state, status) {
      state.authStatus = status
    }
  },
  actions: {},
  modules: {}
});
