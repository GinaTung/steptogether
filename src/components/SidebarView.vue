<template>
  <!-- 內部內容，超出時才滾動 -->
  <div class="p-3 flex-1 overflow-y-auto hidden xl:block">
    <div class="card flex flex-col justify-center mb-5">
      <span class="px-2 font-black hidden md:block">PAGES YOU LIKE</span>
      <ul class="px-2 unstyled hidden md:block">
        <li v-for="(item, index) in pageLikeList" :key="index" class="my-3 flex items-center justify-between">
          <router-link :to="item.link || '/default-path'" class="flex items-center">
            <i :class="['me-2', item.icon]"></i>
            <div class="flex flex-col">
              <span class="text-sm">{{ item.userName }}</span>
              <span class="text-sm">{{ item.userId }}</span>
            </div>
          </router-link>
          <Button class="bg-[#d0d6dd26] rounded-lg p-2 ms-4" label="Follow me"></Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import springFirst from "@/assets/images/spring_first.jpg";

const pageLikeList = ref([
  {
    link: "/", // 確保 link 有值
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    icon: "pi pi-user",
    userName: "Scarlett Floyd",
    userId: "@floydlett"
  },
  {
    link: "/",
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    icon: "pi pi-user",
    userName: "Scarlett Floyd",
    userId: "@floydlett"
  },
  {
    link: "/",
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    icon: "pi pi-user",
    userName: "Scarlett Floyd",
    userId: "@floydlett"
  },
]);
</script>