<template>
  <PageBase>
     <v-container>
      <div class="about">
        <h1>This is an form page</h1>
      </div>

      <v-form v-model="valid" @submit.prevent>

        <v-text-field
          v-model="title"
          :counter="10"
          label="Youtube URL"
          required
        ></v-text-field>

        <v-text-field
          v-model="title"
          :counter="10"
          label="タイトル"
          required
        ></v-text-field>

        <v-btn
          color="warning"
          @click="add"
        />
      </v-form>
     </v-container>
  </PageBase>
</template>

<script>
import PageBase from "@/views/layout/PageBase.vue";

export default {
  components: {
    PageBase
  },
  data() {
    return {
      valid: false,
      title: "",
      youtubeUrl: "",
      videoId: "",
      description: ""
    }
  },
  methods: {
    add() {
      this.$store.commit('onRecipeAdd', this.title);
      this.$router.push({name: "About"})
    }
  }
};
</script>
