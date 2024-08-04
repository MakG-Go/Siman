<script>
export default {
  name: "Radio",
  props: {
    dataStorage: { type: Object, default: {} },
  },
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    getTarget(key) {
      this.$emit("v-radio", key);
    },
  },


};
</script>
<template>
  <div class="radio__container">
    <div class="radio" v-for="(item, key, ndx) in dataStorage" :key="key">
      <input
        type="radio"
        v-model="selectedItem"
        :checked="selectedItem == key || ndx == 0"
        :value="key"
        :id="item.name"
        :name="key"
        @change="getTarget(key)"
      />
      <label :for="item.name" v-html="item.name"></label>
    </div>
  </div>
</template>
