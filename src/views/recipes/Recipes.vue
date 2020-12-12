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
      this.$router.push({ name: "ShowRecipe", params: { recipeId: recipeId } });
    }
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  created() {

    let payload = {
      title: "",
      description: "",
      youtubeVideoId: "y40UDioGgAc",
      userId: 1
    }
    payload.description = `
      【フライド大根】
    是非お試しください！

    ☆2019年レシピ本大賞入選☆
    【クタクタでも速攻でつくれる!バズレシピ太らないおかず編】
    →https://www.amazon.co.jp/dp/4594613705

    ★今回のレシピはこちら↓
    #めっちゃうま い
    #バズレシピ
    #リュウジレシピ

    フリーBGM
    DOVA-SYNDROME
    https://dova-s.jp/

    効果音ラボ
    https://soundeffect-lab.info/
    `;
    payload.title = "テスト1タイトル";
    this.$store.commit("addRecipe", payload);

    payload.title = "テスト2タイトル";
    this.$store.commit("addRecipe", payload);

    payload.title = "テスト3タイトル";
    this.$store.commit("addRecipe", payload);
  }
};
</script>
