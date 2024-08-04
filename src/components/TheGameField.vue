<script>
import { COLORS, SOUNDS } from "@/constans.js";
import Segmet from "./moleculs/Segmet.vue";
import Score from "./moleculs/Score.vue";

export default {
  name: "GameField",
  components: { Segmet, Score },
  props: {
    complexity: {
      type: Object,
      default: () => {
        return {
          segments: 4,
          speed: 1,
        };
      },
    },
    start: { type: Boolean, required: true },
    restartGame: { type: Boolean, required: false },
    sound: { type: Object, required: true },
    skin: { type: Object, required: true },
  },
  data() {
    return {
      activeBtn: 0,
      round: 0,
      currentChoice: 0,
      activeSegment: null,

      startGame: false,
      startPreview: false,
      lockPlain: false,

      patern: new Array(),

      correct: "",

      circle: true,
    };
  },

  methods: {
    createPatern() {
      if (this.patern.length <= this.round) {
        const segment = this.getRandomInt(0, this.complexity.segments);
        this.patern.push(segment);
        this.lockPlain = false;
      }
    },

    showPatern(index) {
      this.$refs.audio.forEach((item, key) => {
        key != index ? item.stopSound() : "";
      });

      this.activeSegment = index;
    },

    checkAnswer(index) {
      this.$refs.audio.forEach((item, key) => {
        item.stopSound();
      });

      this.activeSegment = index;

      if (index === this.patern[this.currentChoice]) {
        this.currentChoice++;
        this.checkPattern();
        return;
      }

      this.saveLiders();
      this.$emit("v-restart", true, this.round);
    },

    async checkPattern() {
      if (this.currentChoice === this.patern.length) {
        this.round++;
        this.currentChoice = 0;
        this.activeBtn = 0;

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve((this.startPreview = true), this.createPatern());
          }, 1500);
        });

        this.startPatternPreview();
      }
    },

    restart() {
      this.activeBtn = 0;
      this.round = 0;
      this.currentChoice = 0;

      this.startPreview = false;
      this.patern = new Array();
      this.correct = "";
      this.createPatern();

      setTimeout(() => {
        this.startPreview = true;
        this.startPatternPreview();
      }, 1000);
    },

    startGamePreview() {
      if (this.activeBtn + 1 <= this.complexity.segments) {
        this.activeSegment = this.patern[this.activeBtn];

        this.$refs.audio.forEach((item, key) => {
          key === this.activeBtn ? item.showPatern() : "";
        });

        this.activeBtn++;
        return;
      }

      this.activeBtn = 0;
      this.activeSegment = null;
      this.startGame = true;
      // this.startPreview = true;
      this.createPatern();
    },

    startPatternPreview() {
      if (this.activeBtn + 1 <= this.patern.length) {
        this.activeSegment = this.patern[this.activeBtn];

        this.$refs.audio.forEach((item, key) => {
          key === this.activeSegment ? item.showPatern() : "";
        });

        this.lockPlain = false;
        this.activeBtn++;

        return;
      }

      this.startPreview = false;
      this.lockPlain = true;
      this.activeSegment = null;
    },

    audioEnd() {
      if (!this.startGame) {
        this.startGamePreview();
      }

      if (this.startPreview) {
        this.startPatternPreview();
      }
    },

    audioUpdate(event) {
      const simonSound = event.target;

      const currentTime = simonSound.currentTime;
      const duration = simonSound.duration;
      const midpoint = duration * 0.55;

      currentTime >= midpoint ? (this.activeSegment = null) : "";
    },

    saveLiders() {
      let storage = JSON.parse(localStorage.getItem("liderbord"));

      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth();
      let Day = Data.getDate();
      let Hour = Data.getHours();
      let Minutes = Data.getMinutes();

      storage.push({
        score: this.round,
        date: `${Day}.${Month}.${Year} / ${Hour}:${Minutes}`,
        level: this.complexity.name,
      });

      localStorage.setItem("liderbord", JSON.stringify(storage));
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
  },

  watch: {
    start() {
      if (this.start) {
        this.startGamePreview();
        return;
      }
      this.activeBtn = 0;
      this.round = 0;
      this.currentChoice = 0;
      this.activeSegment = null;
      this.startGame = false;
      this.startPreview = false;
      this.lockPlain = false;
      this.patern = new Array();
      this.correct = "";
    },

    startGame() {
      if (!this.start) return;
      setTimeout(() => {
        this.startPreview = true;
        this.startPatternPreview();
      }, 1000);
    },

    restartGame() {
      if (!this.start) return;
      if (!this.restartGame) {
        this.restart();
      }
    },
  },

  computed: {
    disabelSegments() {
      if (!this.lockPlain || !this.startGame) {
        return {
          "pointer-events": "none",
        };
      }
    },

    getSegmentClass() {
      return {
        segment: this.skin.class != "circle",
        segment__circle: this.skin.class === "circle",
      };
    },

    getSegmentColor() {
      return (value) => {
        return `segment_${COLORS[value]}`;
      };
    },

    getSegmentActive() {
      return (value) => {
        return {
          active: value === this.activeSegment && this.activeSegment != null,
        };
      };
    },

    getFeeldSkin() {
      return {
        field: this.skin.class != "circle",
        field__circle: this.skin.class === "circle",
      };
    },

    getSegmentSkin() {
      return (item) => {
        if (this.skin.class === "circle") {
          return {
            transform: `rotate(${(360 / this.complexity.segments) * item}deg)`,
          };
        }
      };
    },

    getComplexityClass() {
      if (this.skin.class === "circle") {
        return `segment__circle_${this.complexity.level}`;
      }
      return `segment_${this.complexity.level}`;
    },
  },
};
</script>

<template>
  <div class="container container_center">
    <section :class="getFeeldSkin" :style="disabelSegments">
      <Segmet
        v-for="(item, index) in complexity.segments"
        :class="[
          getSegmentClass,
          getSegmentColor(index),
          getSegmentActive(index),
          getComplexityClass,
        ]"
        :style="getSegmentSkin(index)"
        :key="index"
        :sound="sound[index]"
        :complexity="complexity"
        ref="audio"
        @v-showPatern="showPatern(index)"
        @v-segmentClick="checkAnswer(index)"
        @v-audioEnd="audioEnd"
        @v-audioUpdate="audioUpdate"
      >
      </Segmet>
      <Score :score="round" :skin="skin" :start="startGame" />
    </section>
  </div>
</template>
