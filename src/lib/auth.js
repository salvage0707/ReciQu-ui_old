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
        user: null,
        idToken: null,
        idTokenExp: new Date(),
        onceListeners: []
      }
    },
    methods: {
      async login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider)
        await this.updateCurrentUser(result.user);
      },
      async logout() {
        firebase.auth().signOut();
        this.updateCurrentUser(null);
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
      },
      async updateCurrentUser(user) {
        if (user) {
          this.idToken = user.getIdToken();
          // TODO: バックエンドからユーザー情報を取得する処理
          await _sleep(2000).then(() => {
            this.user = {name: "テスト"}
          });
          this.isAuthenticated = true;
        } else {
          this.idToken = null;
          this.user = null;
          this.isAuthenticated = false;
        }
      }
    },
    async created() {
      // Firebase Auth の初期化をした後にユーザー情報を取得する
      // ユーザー管理は`updateCurrentUser`メソッドを使用するため
      // 本処理を認証状態の変更ごとに発火しないようにunsubscribeさせる
      let unsubscribe;
      unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        await this.updateCurrentUser(user);
        this.loading = false;
        unsubscribe();
      });

    }
  })

  return instance;
}

export const FirebaseAuth = {
  install(Vue) {
    Vue.prototype.$auth = useFirebaseAuth();
  }
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
