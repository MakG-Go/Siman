<script>
import { getLiderboard } from "@/methods.js";
export default {
  name: "LiderBoard",
  data() {
    return {
      liderboard: JSON.parse(getLiderboard()),
    };
  },

  methods: {
    restart() {
      this.$emit("v-on-restart");
    },

    toMenu(){
      this.$emit("v-to-menu");
    }
  },

  computed: {
    getBordData() {
      let data = this.liderboard.sort((a, b) => {
        if (a.score > b.score) return -1;
      });
      return data;
    },
    getMedal() {
      return (value) => {
        switch (value) {
          case 0: {
            return "&#129351";
          }
          case 1: {
            return "&#129352";
          }
          case 2: {
            return "&#129353";
          }
        }
      };
    },
  },
};
</script>
<template>
  <div class="container container_center">
    <div class="liderboard">
      <table class="liderboard__table">
        <tbody>
          <tr class="liderboard__row">
            <th class="liderboard__cell">Место</th>
            <th class="liderboard__cell">Очки</th>
            <th class="liderboard__cell">Сложность</th>
            <th class="liderboard__cell">Дата</th>
          </tr>
          <tr v-for="(item, key) in getBordData" class="liderboard__row">
            <td class="liderboard__cell">
              <span v-html="getMedal(key)"></span> № {{ key + 1 }}
            </td>
            <td class="liderboard__cell">{{ item.score }}</td>
            <td class="liderboard__cell">{{ item.level }}</td>
            <td class="liderboard__cell">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="liderboard__footer">
      <button class="button" style="--color: #1cb144" @click="restart">
        Restart
      </button>

      <button class="button" style="--color: #1cb144" @click="toMenu">
        To Menu
      </button>
    </div>
  </div>
</template>
