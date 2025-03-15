<template>
  <div class="flex w-full h-full">
    <!-- 左側固定區塊 -->
    <div
      class="w-70 h-[calc(100vh-60px)] bg-[#d0d6dd26] flex flex-col fixed left-0 top-[60px] bottom-3 inset-y-3 m-3"
      v-if="menuVisible"
    >
      <!-- 內部內容，超出時才滾動 -->
      <div class="p-3 flex-1 overflow-y-auto">
        <div class="card flex justify-center mb-5">
          <PanelMenu :model="menuList" class="w-full md:w-70">
            <template #item="{ item }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a
                  v-ripple
                  class="no-border flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                  :href="href"
                  @click="navigate"
                >
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                v-ripple
                class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                :href="item.url"
                :target="item.target"
              >
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
                <img
                  class="object-contain border border-black me-2 rounded max-w-9 max-h-9"
                  :src="item.imgSrc"
                  :alt="item.imgAlt"
                />
                <span>{{ item.text }}</span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 右側區塊 (可滾動) -->
    <div class="flex-1 overflow-y-auto p-3" :class="{ 'ml-72': menuVisible, 'ml-0': menuVisible }">
      <div class="bg-[#d0d6dd26] p-3 inset-y-3">
        <h3 class="text-black mb-3 text-xl">Upcoming Friends</h3>
        <Panel class="p-5 mb-5">
          <template #header>
            <div class="flex items-center gap-2">
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <div class="flex flex-col">
                <span class="font-bold">Amy Elsner</span>
                <span> 4 Feb 2025 at 10:50</span>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-user" rounded text></Button>
                <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-ellipsis-v" severity="secondary" rounded text @click="toggle" />
            <Menu ref="menu" id="config_menu" :model="postList" popup />
          </template>
          <div class="flex my-3">
            <div class="flex gap-4 w-full">
              <!-- 第一張圖片 -->
              <div
                class="bg-[rgba(208,214,221,0.15)] p-3 rounded-lg w-1/2 flex items-center justify-center"
              >
                <img
                  :src="springFirst"
                  alt="springFirst"
                  class="w-full h-auto max-h-90 rounded-lg"
                />
              </div>

              <!-- 第二張圖片 -->
              <div
                class="bg-[rgba(208,214,221,0.15)] p-3 rounded-lg w-1/2 flex items-center justify-center"
              >
                <img
                  :src="springSecond"
                  alt="springSecond"
                  class="w-full h-auto max-h-90 rounded-lg"
                />
              </div>
            </div>
          </div>

          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
        <Panel class="p-5 mb-5">
          <template #header>
            <div class="flex items-center gap-2">
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <div class="flex flex-col">
                <span class="font-bold">Amy Elsner</span>
                <span> 4 Feb 2025 at 10:50</span>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-user" rounded text></Button>
                <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-ellipsis-v" severity="secondary" rounded text @click="toggle" />
            <Menu ref="menu" id="config_menu" :model="postList" popup />
          </template>
          <div class="flex my-3">
            <div class="flex gap-4 w-full">
              <!-- 第一張圖片 -->
              <div
                class="bg-[rgba(208,214,221,0.15)] p-3 rounded-lg w-1/2 flex items-center justify-center"
              >
                <img
                  :src="springFirst"
                  alt="springFirst"
                  class="w-full h-auto max-h-90 rounded-lg"
                />
              </div>

              <!-- 第二張圖片 -->
              <div
                class="bg-[rgba(208,214,221,0.15)] p-3 rounded-lg w-1/2 flex items-center justify-center"
              >
                <img
                  :src="springSecond"
                  alt="springSecond"
                  class="w-full h-auto max-h-90 rounded-lg"
                />
              </div>
            </div>
          </div>

          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import loginSocial from "@/assets/images/login-social-img.jpg";
import springFirst from "@/assets/images/spring_first.jpg";
import springSecond from "@/assets/images/spring_second.jpg";
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

const menu = ref(null);

const postList = ref([
  {
    label: "儲存貼文",
    icon: "pi pi-bookmark",
  },
  {
    label: "隱藏貼文",
    icon: "pi pi-bookmark",
  },
  {
    label: "檢舉貼文",
    icon: "pi pi-bookmark",
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
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
</style>
