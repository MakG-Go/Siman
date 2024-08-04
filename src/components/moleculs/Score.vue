<script>
export default {
  name: "Score",
  props: {
    score: { type: Number, default: 0 },
    skin: { type: Object, required: true },
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
    <p class="score__text">
      <span class="text">Раунд: {{ score + 1 }}</span>
      <span class="text">Очки: {{ score }}</span>
    </p>
  </div>
</template>
