import { createApp, nextTick } from "vue";
import { getLiderboard } from "./methods.js";
import "./style.scss";
import App from "./App.vue";

createApp(App).mount("#app");
nextTick(() => {
  getLiderboard();
});
