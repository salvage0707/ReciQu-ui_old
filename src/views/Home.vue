<template>
  <PageBase>
    <v-container>
      <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </div>
    </v-container>
  </PageBase>
</template>

<script>
import PageBase from "@/views/layout/PageBase.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    PageBase,
    HelloWorld
  }
};
</script>
