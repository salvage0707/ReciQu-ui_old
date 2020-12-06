<template>
  <OnePageBase>
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Sign In
          </h1>

          <v-btn
            class="font-weight-bold accent-1"
            color="#FFAB40"
            @click="login"
            >Sign in with Google</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </OnePageBase>
</template>

<script>
import OnePageBase from "@/views/layout/OnePageBase.vue";

export default {
  components: {
    OnePageBase
  },
  methods: {
    login() {
      this.$auth.login().then(() => {
        this.redirect();
      });
    },
    redirect() {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  created() {
    if (this.$auth.isAuthenticated) {
      this.redirect();
    }
  }
};
</script>
