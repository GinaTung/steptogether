<template>
  <div class="flex w-full h-full">
    <!-- 左側固定區塊 -->
    <div
      class="sm:w-20 md:w-70 h-[calc(100vh-56px)] bg-[#d0d6dd26] flex flex-col fixed left-0 top-[56px] bottom-3 inset-y-3 m-3 hidden sm:flex"
      v-if="menuVisible">
      <MainLeftSidebarView />
    </div>
    <!-- 中間區塊 -->
    <div class="flex-1 overflow-y-auto pt-1 mt-[64px]" :class="{
      'sm:ml-26 md:ml-75 xl:mr-75': menuVisible, // 左右兩側留白
      'ml-0 mr-0': !menuVisible,
    }">
      <router-view />
    </div>
    <!-- 右側區塊 (固定) -->
    <div>
      <SidebarView
        class="sm:w-20 md:w-70 h-[calc(100vh-56px)] bg-[#d0d6dd26] flex flex-col fixed right-0 top-[56px] bottom-3 inset-y-3 m-3 hidden xl:block"
        v-if="menuVisible" />
    </div>
  </div>
</template>

<script setup>
import MainLeftSidebarView from "@/components/MainLeftSidebarView.vue";
import SidebarView from "@/components/SidebarView.vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/useHomeStore";
const homeStore = useHomeStore();
const { menuVisible } = storeToRefs(homeStore); // 這樣 `menuVisible` 會保持響應式
</script>
