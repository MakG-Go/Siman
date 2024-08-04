<script>
import GameField from "@/components/TheGameField.vue";
import Complexity from "@/components/TheComplexity.vue";
import LiderBoard from "./components/TheLiderBoard.vue";

export default {
  components: {
    Complexity,
    GameField,
    LiderBoard,
  },
  data() {
    return {
      start: false,
      show: false,
      restart: false,
      complexity: {},
      sound: {},
      skin:{},
    };
  },
  methods: {
    getField(complexity, sound, skin) {
      console.log(skin)

      this.complexity = complexity;
      this.sound = sound;
      this.skin = skin;
      this.show = true;

    },

    onAfterEnter() {
      this.start = true;
    },

    onRestart(restart, score) {
      this.restart = restart;
    },

    getRestart() {
      this.restart = false;
    },

    toMenu() {
      this.start = false;
      this.show = false;
      this.restart = false;
      this.complexity = {};
      this.sound = {};
      this.skin = {};
    },
  },
};
</script>
<template>

  <Complexity @v-start="getField" :show="show" />

  <transition name="bounce" @after-enter="onAfterEnter" mode="out-in">
    <GameField
      v-show="show && !restart"
      :start="start"
      :restart-game="restart"
      :complexity="complexity"
      :sound="sound"
      :skin="skin"
      @v-restart="onRestart"
    />
  </transition>

  <transition name="bounce" mode="out-in">
    <LiderBoard
      v-if="restart"
      @v-on-restart="getRestart"
      @v-to-menu="toMenu"
    />
  </transition>
</template>
