<template>
      <!-- 內部內容，超出時才滾動 -->
      <div class="p-3 flex-1 overflow-y-auto hidden xl:block">
        <div class="card flex flex-col justify-center mb-5">
        <span class="px-4 font-black hidden md:block">PAGES YOU LIKE</span>
        <ul class="p-4 unstyled hidden md:block">
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
</template>
<script setup>

import { ref } from "vue";

import springFirst from "@/assets/images/spring_first.jpg";
const pageLikeList = ref([
  {
    link: "/path1",
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/path2",
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
  {
    link: "/path3",
    imgSrc: springFirst,
    imgAlt: "login-social-img",
    text: "World of Mountains",
  },
]);
</script>