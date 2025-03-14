<template>
  <div class="flex w-full h-full">
<!-- 左側固定區塊 -->
<div class="w-70 h-[calc(100vh-60px)] bg-[#d0d6dd26] flex flex-col fixed left-0 top-[60px] bottom-3 inset-y-3 m-2" v-if="menuVisible">
  <!-- 內部內容，超出時才滾動 -->
  <div class="p-3 flex-1 overflow-y-auto">

    <div class="card flex justify-center mb-5">
      <PanelMenu :model="menuList" class="w-full md:w-70">
        <template #item="{ item }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple class="no-border flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
              :href="href" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
            :href="item.url" :target="item.target">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
          </a>
        </template>
      </PanelMenu>
    </div>
    <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
    <span class="px-4 font-black">PAGES YOU LIKE</span>
    <ul class="p-4 unstyled">
      <li v-for="(item, index) in pageLikeList" :key="index" class="my-3">
        <div class="flex items-center">
          <router-link :to="item.link" class="flex items-center">
            <img class="object-cover border border-black me-2 rounded max-w-9 max-h-9"
              :src="item.imgSrc" :alt="item.imgAlt" />
            <span>{{ item.text }}</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</div>


    <!-- 右側區塊 (可滾動) -->
    <div class="flex-1 ml-64 overflow-y-auto p-5">
      <div class="bg-[#d0d6dd26] p-3 inset-y-3">123</div>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";

import loginSocial from "@/assets/images/login-social-img.jpg";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const router = useRouter();
import { useHomeStore } from "@/stores/useHomeStore";

const homeStore = useHomeStore();
const { menuVisible } = storeToRefs(homeStore); // 這樣 `menuVisible` 會保持響應式

const menuList = ref([
  {
    label: "home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Friends",
    icon: "pi pi-users",
    command: () => {
      router.push("/friends");
    },
  },
  {
    label: "Videos",
    icon: "pi pi-video",
    command: () => {
      router.push("/videos");
    },
  },
  {
    label: "Learns",
    icon: "pi pi-book",
    command: () => {
      router.push("/learns");
    },
  },
  {
    label: "Arts",
    icon: "pi pi-palette",
    command: () => {
      router.push("/arts");
    },
  },
]);
const pageLikeList = ref([
  {
    link: "/path1",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/path2",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/path3",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
]);

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
</style>
