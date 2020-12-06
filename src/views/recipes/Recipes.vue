<template>
  <PageBase>
    <v-container>
      <div class="about">
        <h1>レシピ</h1>
      </div>
      <v-row>
        <ul id="example-1">
          <li v-for="recipe in recipes" :key="recipe.id">
            <div @click="linkToShowRecipe(recipe.id)">
              {{ recipe.title }}
            </div>
          </li>
        </ul>
      </v-row>
    </v-container>
  </PageBase>
</template>

<script>
import PageBase from "@/views/layout/PageBase.vue";

export default {
  name: "About",
  components: {
    PageBase
  },
  methods: {
    linkToShowRecipe(recipeId) {
      this.$router.push({ name: "ShowRecipe", param: { recipeId: recipeId } });
    }
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  created() {
    this.$store.commit("addRecipe", "てすと1");
    this.$store.commit("addRecipe", "てすと2");
    this.$store.commit("addRecipe", "てすと3");
  }
};
</script>
