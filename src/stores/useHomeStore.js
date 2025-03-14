// src/stores/useHomeStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore("home", () => {
  const menuVisible = ref(true);

  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
  };

  return { menuVisible, toggleMenu };
});
