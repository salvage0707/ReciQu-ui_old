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
        
        <Youtube v-if="videoId" :video-id="videoId" ref="youtube"></Youtube>

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
import { getIdFromUrl, Youtube } from 'vue-youtube';

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
      videoId: "",
      description: ""
    }
  },
  methods: {
    add() {
      this.$store.commit('onRecipeAdd', this.title);
      this.$router.push({name: "About"})
    }
  },
  watch: {
    youtubeUrl: function(newVal) {
      this.videoId = getIdFromUrl(newVal);
      console.log(this.videoId);
    }
  }
};
</script>
