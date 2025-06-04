// src/stores/signupStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
// import axios from "axios"; // <--- 必須引入 axios
import { $post } from '@/api/util/axiosInstance';

export const useSignupStore = defineStore("signup", () => {
  const signupList = ref([]); // 假設你要存資料

  const getSignupData = async (payload) => {
    const response = await $post(`signup`, payload);
    
    if (!response.error) {
      signupList.value = response.data;
    }

    return response; // ⚠️ 組件可以透過這個拿 error 或成功資料
  };

  return {
    signupList,
    getSignupData, // 傳回函數
  };
});
