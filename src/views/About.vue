<template>
  <PageBase>
     <v-container>
      <div class="about">
        <h1>This is an about page</h1>
      </div>
      <ul id="example-1">
        <li v-for="recipe in recipes" :key="recipe.id">
          {{ recipe }}
        </li>
      </ul>
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
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  created() {
    this.$store.commit('onRecipeAdd', "てすと1");
    this.$store.commit('onRecipeAdd', "てすと2");
    this.$store.commit('onRecipeAdd', "てすと3");
  }
};
</script>
