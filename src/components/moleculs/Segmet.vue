<script>
export default {
  name: "Segment",
  props: {
    sound: { type: String, requires: true },
    complexity: {
      type: Object,
      required: true
    },
  },
  methods: {
    playSound() {
      this.$emit("v-segmentClick");
      this.$refs.sound.play();
    },
    showPatern() {
      this.$emit("v-showPatern");

      this.$refs.sound.play();
    },
    stopSound() {
      this.$refs.sound.pause();
      this.$refs.sound.currentTime = 0;
    },
    audioEnd() {
      this.$emit("v-audioEnd");
    },

    audioUpdate(event) {
      this.$emit("v-audioUpdate", event);
    },
  },
  mounted() {
    this.$refs.sound.volume = 0.5;
    this.$refs.sound.playbackRate = this.complexity.speed;
  },
};
</script>
<template>
  <div @click="playSound">
    <audio
      ref="sound"
      :src="sound"
      @ended="audioEnd"
      @timeupdate="audioUpdate($event)"
    ></audio>
  </div>
</template>
