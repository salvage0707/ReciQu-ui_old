import Vue from "vue"
import firebase from "@firebase/app";
import "@firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Firebaseの初期化
// TODO: できればリファクタリングしたい（firebaseの初期化部分）
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCHET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};
firebase.initializeApp(config);

// 認証関連

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

let instance;

export const getInstance = () => instance;

export const useFirebaseAuth = () => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        loading: true,
        error: null,
        isAuthenticated: false,
        user: {},
        idToken: null,
        idTokenExp: new Date()
      }
    },
    methods: {
      async login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
      },
      logout() {
        firebase.auth().signOut();
      },
      async getIdToken() {
        if (!this.isAuthenticated) return "";

        // 現在のUNIX エポック時刻を取得
        var nowTime = new Date().getTime();

        // 有効期限チェック
        if (!this.idToken || this.idTokenExp.getTime() < nowTime) {
          await this.user.getIdTokenResult(true).then((result) => {
            this.idToken = result.token;
            this.idTokenExp = new Date(result.expirationTime);
          })
        }

        return this.idToken;
      }
    },
    async created() {
      // ユーザーのログイン状態が変わるたびに実行される処理を定義
      await firebase.auth().onAuthStateChanged((user) => {
        this.loading = true;

        if (user) {
          this.user = user;
          this.isAuthenticated = true;
        } else {
          this.user = {};
          this.isAuthenticated = false;
        }

        this.loading = false;
      })
    }
  })

  return instance;
}

export const FirebaseAuth = {
  install(Vue) {
    Vue.prototype.$auth = useFirebaseAuth();
  }
}