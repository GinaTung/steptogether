<template>
  <!-- 中側區塊 (可滾動) -->
  <div
    class="flex-1 overflow-y-auto pt-1"
    :class="{
      'sm:ml-26 md:ml-75 xl:mr-75': menuVisible, // 左右兩側留白
      'ml-0 mr-0': !menuVisible,
    }"
  >
    <div class="bg-[#d0d6dd26] p-3 inset-y-3">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-black text-xl">{{ route.name.charAt(0).toUpperCase() + route.name.slice(1).toLowerCase() }}
        </h3>
        <div>
          <Button
            icon="pi pi-microsoft"
            severity="secondary"
            @click="toggleBlock('Block')"
            class="mx-1"
          />
          <Button
            icon="pi pi-list"
            severity="secondary"
            @click="toggleList('List')"
            class="mx-1"
          />
        </div>
      </div>

      <PostImgListView v-show="changeBlock === 'List'" />
      <PostImgBlockView v-show="changeBlock === 'Block'" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/useHomeStore";
import PostImgListView from "@/components/PostImgListView.vue";
import PostImgBlockView from "@/components/PostImgBlockView.vue";
const homeStore = useHomeStore();
const { menuVisible } = storeToRefs(homeStore); // 這樣 `menuVisible` 會保持響應式


const changeBlock = ref("List"); // 預設顯示 A 區塊

const toggleBlock = () => {
changeBlock.value = "Block";
};
const toggleList = () => {
changeBlock.value = "List";
};
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
