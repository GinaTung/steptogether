<template>
  <div class="flex flex-col min-h-screen">
    <!-- 固定 Header -->
    <Header v-if="showHeaderFooter" class="fixed top-0 left-0 right-0 z-50 bg-[#c1c6cd66]" />
    
    <!-- 主要內容區，增加 padding-top 以避免被 Header 擋住 -->
    <div class="flex flex-1 overflow-hidden pt-[60px]">
      <router-view />
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/HeaderView.vue';
// import Footer from './components/Footer.vue';
// import Loading from './components/Loading.vue';

// const isLoading = ref(true);
const route = useRoute();

// 判斷當前路由是否需要 Header 和 Footer
const showHeaderFooter = computed(() => !['/login','/signUp'].includes(route.path));

// onMounted(() => {
//   setTimeout(() => {
//     isLoading.value = false; // 模擬資料載入完成
//   }, 1000);
// });
</script>
