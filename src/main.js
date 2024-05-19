import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import createStore from "./store";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you have the icons package installed
import "vuetify/styles"; // Import Vuetify styles

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);

app.use(router);
app.use(createStore);
app.use(vuetify);

app.mount("#app");
