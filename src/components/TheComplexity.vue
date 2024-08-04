<script>
import Select from "@/components/moleculs/Select.vue";
import Radio from "@/components/moleculs/RadioButton.vue";
import { COMPLEXITY, SOUNDS, SKIN } from "@/constans.js";

export default {
  name: "Complexity",
  components: { Select, Radio },
  props: {
    show: { type: Boolean, default: false },
    gameRestart: { type: Boolean, default: false },
  },
  data() {
    return {
      hideBtn: false,
      complexityStorage: COMPLEXITY,
      soundsStorage: SOUNDS,
      skinStorage: SKIN,
      skin: "classic",
      complexity: "easy",
      sound: "Standart",
    };
  },
  mounted() {
    if (this.gameRestart) {
      this.skin = "classic";
      this.complexity = "easy";
      this.sound = "Standart";
    }
  },
  methods: {
    start() {
      let soundData = this.soundsStorage[this.sound];
      let complexityData = this.complexityStorage[this.complexity];
      complexityData["level"] = this.complexity;

      let skin = this.skinStorage[this.skin];

      this.$emit("v-start", complexityData, soundData, skin);
      this.hideBtn = true;
    },
    getGomplexity(value) {
      this.complexity = value;
    },
    getSound(value) {
      this.sound = value;
    },
    getSkin(value) {
      this.skin = value;
    },
  },
};
</script>

<template>
  <div class="complexity">
    <ul class="complexity__items">
      <li class="complexity__item">
        <h3>Сложность:</h3>
        <Radio :data-storage="complexityStorage" @v-radio="getGomplexity" />
      </li>
      <li class="complexity__item">
        <h3>Скин:</h3>
        <Radio :data-storage="skinStorage" @v-radio="getSkin" />
      </li>
      <li class="complexity__item">
        <h3>Мелодия:</h3>
        <Select :data-storage="soundsStorage" @v-select="getSound" />
      </li>
    </ul>

    <button class="button" style="--color: #4db1bc" @click="start">PLay</button>
  </div>
</template>
