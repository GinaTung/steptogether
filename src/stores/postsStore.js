import { defineStore } from "pinia";
import { ref } from "vue";
import { $get, $post } from '@/api/util/axiosInstance';

export const usePostsStore = defineStore("posts", () => {
  const postsList = ref([]);
  const addUserPostsList = ref([]);

  const getPostsData = async () => {
    try {
      const response = await $get(`Posts`);
      postsList.value = response.data.posts;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

const addUserPostsData = async (payload) => {
  try {
    const response = await $post(`UserPosts`, payload);
    addUserPostsList.value = response.data.posts;
    return { error: false, message: '新增成功' };
  } catch (error) {
    console.error("Error posting article:", error);
    return { error: true, message: '新增失敗' };
  }
};


  return {
    postsList,
    getPostsData,
    addUserPostsData,
    addUserPostsList
  };
});
