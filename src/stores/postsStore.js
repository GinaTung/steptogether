// src/stores/postsStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
// import axios from "axios"; // <--- 必須引入 axios
import { $get } from '@/api/util/axiosInstance';

export const usePostsStore = defineStore("posts", () => {
  const postsList = ref([]); // 假設你要存資料

  // 改為直接執行，讓組件可以正常呼叫
  const getPostsData = async () => {
    try {
      const response = await $get(`Posts`);
      postsList.value = response.data.posts;
      
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return {
    postsList,
    getPostsData, // 傳回函數
  };
});
