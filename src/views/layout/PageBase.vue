<template>
  <v-app>
    <Header />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/views/layout/Header.vue";

export default {
  components:{
    Header
  }
};
</script>