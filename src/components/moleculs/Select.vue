<script>
export default {
  name: "Select",
  props: {
    dataStorage: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      value: "Выбери звук",
      visible: false,
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    select(option) {
      this.value = option;
      this.$emit('v-select', option)
    },
  },
};
</script>
<template>
  <div class="aselect">
    <div class="selector" @click="toggle">

      <div class="selector__label">
        <span>{{ value }}</span>
      </div>

      <div class="selector__arrow" :class="{ expanded: visible }"></div>

      <div :class="{ hidden: !visible, visible }">
        <ul class="selector__items">
          <li
            v-for="item, key in dataStorage"
            :class="['selector__item',{ current: key === value }]"
            @click="select(key)"
          >
            {{ key }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
