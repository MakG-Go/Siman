<script>
export default {
  name: "Score",
  props: {
    score: { type: Number, default: 0 },
    skin: { type: Object, required: true },
    start: { type: Boolean, default: false },
  },
  computed: {
    getCircleClass() {
      return {
        score__circle: this.skin.class === "circle",
      };
    },
  },
};
</script>
<template>
  <div :class="['score', getCircleClass]">
    <transition name="bounce" appear>
      <p class="score__text" v-if="!start">
        <span class="text">Preview</span>
      </p>
    </transition>
    <transition name="bounce" appear>
      <p class="score__text" v-if="start" :key="score">
        <span class="text">Раунд: {{ score + 1 }}</span>
        <span class="text">Очки: {{ score }}</span>
      </p>
    </transition>
  </div>
</template>
