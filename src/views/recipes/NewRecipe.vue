<template>
  <PageBase>
    <v-container>
      <div class="about">
        <h1>This is an form page</h1>
      </div>

      <v-form v-model="valid" @submit.prevent>
        <v-text-field
          v-model="youtubeUrl"
          label="Youtube URL"
          required
        ></v-text-field>

        <v-text-field
          v-model="title"
          :counter="10"
          label="タイトル"
          required
        ></v-text-field>

        <v-textarea
          name="input-7-1"
          label="概要"
          hint="レシピの概要を入力してください"
          v-model="description"
        ></v-textarea>

        <div v-show="isShowYoutube" style="height: auto;">
          <Youtube :videoId="videoId" ref="youtube" width="100%"></Youtube>
        </div>
        <v-btn color="warning" @click="add" />
      </v-form>
    </v-container>
  </PageBase>
</template>

<script>
import PageBase from "@/views/layout/PageBase.vue";
import { getIdFromUrl, Youtube } from "vue-youtube";

export default {
  components: {
    PageBase,
    Youtube
  },
  data() {
    return {
      valid: false,
      title: "",
      youtubeUrl: "",
      videoId: null,
      description: ""
    };
  },
  methods: {
    add() {
      const nextId = this.$store.getters.nextRecipeId;

      const payload = {
        title: this.title,
        description: this.description,
        youtubeVideoId: this.videoId,
        userId: this.$auth.user.id
      }
      this.$store.commit("addRecipe", payload);

      this.$router.push({ name: "ShowRecipe", params: { recipeId: nextId } });
    }
  },
  computed: {
    isShowYoutube() {
      return !!this.videoId;
    }
  },
  watch: {
    youtubeUrl: function(newVal) {
      this.videoId = getIdFromUrl(newVal);
    },
    videoId: function(newVal) {
      this.$refs.youtube.updatePlayer(newVal);
    }
  }
};
</script>
