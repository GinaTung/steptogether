import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
// import 'primevue/resources/themes/lara-light-blue/theme.css'; // 選擇主題
// import 'primevue/resources/primevue.min.css'; // 核心樣式
// import 'primeicons/primeicons.css'; // 圖標
// import Button from "primevue/button"
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
// app.component('Button', Button);
app.mount("#app");
