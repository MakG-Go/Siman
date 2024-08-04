<script>
import Select from "@/components/moleculs/Select.vue";
import Radio from "@/components/moleculs/RadioButton.vue";
import { COMPLEXITY, SOUNDS, SKIN } from "@/constans.js";

export default {
  name: "Complexity",
  components: { Select, Radio },
  props: {
    show: { type: Boolean, default: false },
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
  methods: {
    start() {
      let soundData = this.soundsStorage[this.sound];
      let complexityData = this.complexityStorage[this.complexity];
      let skin = this.skinStorage[this.skin];
      console.log(skin, "---skinStorage");

      complexityData["level"] = this.complexity;
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
    <h1 class="text">Simon Says</h1>
    <h3 class="text complexity__title"></h3>

 
      <ul class="complexity__items" v-if="!show">
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


    <transition name="bounce" appear>
      <button
        v-if="!show"
        class="button"
        style="--color: #4db1bc"
        @click="start"
      >
        PLay
      </button>
    </transition>
  </div>
</template>
