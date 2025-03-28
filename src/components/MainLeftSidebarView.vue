<template>
  <!-- 內部內容，超出時才滾動 -->
  <div class="p-3 flex-1 overflow-y-auto hidden sm:block">
    <div class="card flex justify-center mb-5">
      <PanelMenu :model="menuList" class="w-full md:w-70">
        <template #item="{ item }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple
              class="no-border flex items-center justify-items-center md:justify-items-start cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2 rounded-sm"
              :href="href" :class="{ 'bg-[#EF6C00] text-white': route.path === item.route }" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2 hidden md:block">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple
            class="flex items-center justify-items-center md:justify-items-start cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2 rounded-sm"
            :class="{ 'bg-[#EF6C00] text-white': route.path === item.route }" :href="item.url" :target="item.target">
            <span :class="item.icon" />
            <span class="ml-2 hidden md:block">{{ item.label }}</span>
            <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
          </a>
        </template>
      </PanelMenu>
    </div>
    <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700 hidden md:block" />
    <span class="px-4 font-black hidden md:block">PAGES YOU LIKE</span>
    <ul class="p-4 unstyled hidden md:block">
      <li v-for="(item, index) in pageLikeList" :key="index" class="my-3">
        <div class="flex items-center">
          <router-link :to="item.link" class="flex items-center">
            <img class="object-contain border border-black me-2 rounded max-w-9 max-h-9" :src="item.imgSrc"
              :alt="item.imgAlt" />
            <span>{{ item.text }}</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
import loginSocial from "@/assets/images/login-social-img.jpg";
const menuList = ref([
  {
    label: "home",
    icon: "pi pi-home",
    route: "/",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Friends",
    icon: "pi pi-users",
    route: "/friends",
    command: () => {
      router.push("/friends");
    },
  },
  {
    label: "Videos",
    icon: "pi pi-video",
    route: "/videos",
    command: () => {
      router.push("/videos");
    },
  },
  {
    label: "Learns",
    icon: "pi pi-book",
    route: "/learns",
    command: () => {
      router.push("/learns");
    },
  },
  {
    label: "Arts",
    icon: "pi pi-palette",
    route: "/arts",
    command: () => {
      router.push("/arts");
    },
  },
]);
const pageLikeList = ref([
  {
    link: "/",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/",
    imgSrc: loginSocial,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
]);
</script>