<template>
  <!-- 中側區塊 (可滾動) -->
  <div class="bg-[#d0d6dd26] p-3 inset-y-3">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-black text-xl">
        {{ pageTitle }}
      </h3>
      <div>
        <Button icon="pi pi-microsoft" severity="secondary" @click="toggleBlock('Block')" class="mx-1" />
        <Button icon="pi pi-list" severity="secondary" @click="toggleList('List')" class="mx-1" />
      </div>
    </div>

    <PostImgListView v-show="changeBlock === 'List'" :page-title="pageTitle"/>
    <PostImgBlockView v-show="changeBlock === 'Block'" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { usePostsStore } from '@/stores/postsStore'; // 引入 Pinia store
import PostImgListView from "@/components/PostImgListView.vue";
import PostImgBlockView from "@/components/PostImgBlockView.vue";

const route = useRoute();
const postsStore = usePostsStore(); // 使用 Pinia store

const changeBlock = ref("List"); // 預設顯示 A 區塊
const pageTitle = computed(() => {
  const name = route.name ?? ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
})
const toggleBlock = () => {
  changeBlock.value = "Block";
};

const toggleList = () => {
  changeBlock.value = "List";
};

// 當頁面掛載時，調用 getPostsData
onMounted(() => {
  postsStore.getPostsData();
});
</script>

<style scoped>
::v-deep .p-panelmenu-panel {
  border: none;
  outline: none;
}

.hode {
  position: absolute;
  top: 0;
  left: 0;
}

.text-bg {
  background: #000;
}
</style>
