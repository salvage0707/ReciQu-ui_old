import firebase from "@firebase/app";
import "@firebase/auth";
import store from "@/store";

export default {
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  }
};
