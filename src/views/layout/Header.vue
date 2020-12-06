<template>
  <div>
    <v-app-bar app color="orange accent-1" dark>
      <!-- ハンバーガーメニュー -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <!-- TODO: ロゴを追加 -->
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->

        <!-- TODO: フォントを変更 -->
        <h1>ReciQu</h1>
      </div>

      <v-spacer></v-spacer>

      <div v-show="!this.$auth.loading">
        <!-- 未ログイン -->
        <div v-if="this.$auth.isAuthenticated">
          <v-btn
            class="font-weight-bold accent-1"
            color="#FFAB40"
            @click="logout"
            >ログアウト</v-btn
          >
        </div>
        <!-- ログイン済 -->
        <div v-if="!this.$auth.isAuthenticated">
          <v-btn
            class="font-weight-bold accent-1"
            color="#FFAB40"
            @click="login"
            >ログイン</v-btn
          >
        </div>
      </div>
      <div>
        <v-btn
          class="font-weight-bold accent-1"
          color="#FFAB40"
          @click="() => (this.$auth.loading = !this.$auth.loading)"
          >変更</v-btn
        >
      </div>
    </v-app-bar>

    <!-- TODO: サイドバーのメニューを追加 -->
    <!-- TODO: 選択時の背景色を検討 -->
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="lighten-2 text--accent-4"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="linkToRecipes()"
                >マイレシピ</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="linkToNewRecipe()"
                >レシピ登録</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    logout() {
      this.$auth.logout();
      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },
    linkToRecipes() {
      this.$router.push({ name: "Recipes" });
    },
    linkToNewRecipe() {
      this.$router.push({ name: "NewRecipe" });
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
