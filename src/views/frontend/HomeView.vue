<template>
  <div class="flex w-full h-full">
    <!-- 左側固定區塊 -->
    <div
      class="sm:w-20 md:w-70 h-[calc(100vh-56px)] bg-[#d0d6dd26] flex flex-col fixed left-0 top-[56px] bottom-3 inset-y-3 m-3 hidden sm:flex"
      v-if="menuVisible"
    >
      <!-- 內部內容，超出時才滾動 -->
      <div class="p-3 flex-1 overflow-y-auto hidden sm:block">
        <div class="card flex justify-center mb-5">
          <PanelMenu :model="menuList" class="w-full md:w-70">
            <template #item="{ item }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a
                  v-ripple
                  class="no-border flex items-center justify-items-center
                  md:justify-items-start cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2 rounded-sm"
                  :href="href"
                  :class="{ 'bg-[#EF6C00] text-white': route.path === item.route }"
                  @click="navigate"
                >
                  <span :class="item.icon" />
                  <span class="ml-2 hidden md:block">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                v-ripple
                class="flex items-center justify-items-center
                  md:justify-items-start cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2 rounded-sm"
                :class="{ 'bg-[#EF6C00] text-white': route.path === item.route }"
                :href="item.url"
                :target="item.target"
              >
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

    <!-- 中側區塊 (可滾動) -->
    <div class="flex-1 overflow-y-auto pt-1"
      :class="{
        'sm:ml-26 md:ml-75 xl:mr-75': menuVisible, // 左右兩側留白
        'ml-0 mr-0': !menuVisible
      }">
      <div class="bg-[#d0d6dd26] p-3 inset-y-3">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-black text-xl">Upcoming Friends</h3>
          <div>
            <Button icon="pi pi-microsoft" severity="secondary" @click="toggleBlock('Block')" class="mx-1" />
            <Button icon="pi pi-list" severity="secondary" @click="toggleList('List')" class="mx-1" />
          </div>
        </div>
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
            <!-- <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-heart" rounded text></Button>
                <Button icon="pi pi-comment" severity="secondary" rounded text></Button>
                <Button icon="pi pi-send" severity="secondary" rounded text></Button>
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div> -->
          </template>
          <template #icons>
            <div class="relative">
            <!-- 按鈕 -->
            <button
              @click="toggleMenu"
              class="py-2 px-4 cursor-pointer"
              type="button"
            >
              <i class="pi pi-ellipsis-v"></i>
            </button>

            <!-- 主菜單 -->
            <ul
              v-if="isMenuOpen"
              :class="menuPositionClass"
              role="menu"
              ref="menuRef"
              class="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
            >
              <li v-for="(item,index) in postList" :key="index"
              role="menuitem" class="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
             <i :class="item.icon"></i>&ensp;{{ item.label }}
              </li>
            </ul>
          </div>
          </template>
          <div class="my-3">
            <PostImgListView v-show="changeBlock === 'List'" />
            <PostImgBlockView v-show="changeBlock === 'Block'" />
          </div>

        </Panel>
      </div>
    </div>
  <!-- 右側區塊 (固定) -->
    <div>
      <SidebarView class="sm:w-20 md:w-70 h-[calc(100vh-56px)] bg-[#d0d6dd26] flex flex-col fixed right-0 top-[56px] bottom-3 inset-y-3 m-3 hidden xl:block"
      v-if="menuVisible"/>
    </div>
  </div>
</template>

<script setup>
import loginSocial from "@/assets/images/login-social-img.jpg";
// import springFirst from "@/assets/images/spring_first.jpg";
// import springSecond from "@/assets/images/spring_second.jpg";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { ref,computed, onMounted, onBeforeUnmount } from "vue";

const router = useRouter();
const route = useRoute();
import { useHomeStore } from "@/stores/useHomeStore";
import PostImgListView from "@/components/PostImgListView.vue";
import PostImgBlockView from "@/components/PostImgBlockView.vue";
import SidebarView from "@/components/SidebarView.vue";
const homeStore = useHomeStore();
const { menuVisible } = storeToRefs(homeStore); // 這樣 `menuVisible` 會保持響應式

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
const changeBlock = ref('Block'); // 預設顯示 A 區塊

const toggleBlock = () => {
  changeBlock.value = 'Block';
};
const toggleList = () => {
  changeBlock.value = 'List';
};

const menuRef = ref(null); // 用來參考菜單
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
// 點擊外部關閉菜單
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target) && !event.target.closest('button')) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 定義變數和狀態
const isMenuOpen = ref(false); // 菜單開關
const menuPosition = ref('left'); // 菜單顯示位置，預設為 'bottom'

// 計算屬性來控制菜單位置的 class
const menuPositionClass = computed(() => {
  return menuPosition.value === 'left' ? 'top-full right-0' : 'top-0 right-full';
});

// 切換菜單顯示狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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
