<template>
  <div class=" flex flex-col">
    <Header v-if="showHeaderFooter" />
    <div class="flex flex-1 overflow-hidden">
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
