import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import 'primeicons/primeicons.css'; // 圖標
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ToastService from 'primevue/toastservice';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      // 取消深色模式
      darkModeSelector: false, 
      cssLayer: { // TailwindCSS 和 PrimeVue 的载入顺序设置
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
});
app.use(ToastService);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.mount("#app");