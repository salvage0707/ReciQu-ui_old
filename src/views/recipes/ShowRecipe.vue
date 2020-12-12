<template>
  <PageBase>
    <v-container>
      <div class="about">
        <h1>{{ recipe.title }}</h1>
      </div>
      <v-row>
        <v-col sm="12">
          <div >
            <Youtube :videoId="recipe.youtubeVideoId" ref="youtube" resize fitParent></Youtube>
          </div>
        </v-col>

        <v-col>
        <p class="text-justify description">
          {{ recipe.description }}
        </p>
        </v-col>
      </v-row>
    </v-container>
  </PageBase>
</template>

<script>
import PageBase from "@/views/layout/PageBase.vue";
import { Youtube } from "vue-youtube";

export default {
  name: "About",
  components: {
    PageBase,
    Youtube
  },
  data() {
    return {
      recipe: {}
    }
  },
  methods: {
    linkToShowRecipe(recipeId) {
      this.$router.push({ name: "ShowRecipe", param: { recipeId: recipeId } });
    }
  },
  created() {
    const recipeId = this.$route.params.recipeId;
    this.recipe = this.$store.getters.findRecipe(recipeId);
  }
};
</script>

<style scoped>
.description {
  white-space: pre-wrap;
}
</style>
