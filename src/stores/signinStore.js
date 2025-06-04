// src/stores/signinStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
// import axios from "axios"; // <--- 必須引入 axios
import { $post } from '@/api/util/axiosInstance';

export const useSigninStore = defineStore("signin", () => {
  const signinList = ref([]); // 假設你要存資料

  const getSigninData = async (payload) => {
    const response = await $post(`signin`, payload);
    console.log(`response`,response);
    
    if (!response.error) {
      signinList.value = response.data;
    }

    return response; // ⚠️ 組件可以透過這個拿 error 或成功資料
  };

  return {
    signinList,
    getSigninData, // 傳回函數
  };
});
