import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import createStore from "./store";

const app = createApp(App);
app.use(router);
app.use(createStore);
app.mount("#app");
