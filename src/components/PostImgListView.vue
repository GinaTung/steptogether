<template>
  <Panel class="p-5 mb-5">
    <template #header>
      <div class="flex items-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <div class="flex flex-col">
          <span class="font-bold">Amy Elsner</span>
          <span> 4 Feb 2025 at 10:50</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Button icon="pi pi-heart" rounded text></Button>
          <Button icon="pi pi-comment" severity="secondary" rounded @click="toggleComment"></Button>
          <Button icon="pi pi-send" severity="secondary" rounded text></Button>
        </div>
        <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
      </div>
      <!-- 留言區塊 -->
      <div v-if="isCommentVisible">
        <div class="flex items-center">
          <span class="me-3"><i class="pi pi-user"></i></span>
          <Textarea v-model="value" variant="filled" rows="1" cols="30"
            class="w-full bg-[#d0d6dd26] border-1 rounded-lg p-3 my-3" placeholder="What’s on your mind ?" />
          <Button class="flex items-center cursor-pointer ms-3" unstyled
            ><i class="pi pi-send"></i></Button>
        </div>

      </div>
    </template>
    <template #icons>
      <div class="relative">
        <!-- 按鈕 -->
        <button @click="toggleMenu" class="py-2 px-4 cursor-pointer" type="button">
          <i class="pi pi-ellipsis-v"></i>
        </button>

        <!-- 主菜單 -->
        <ul v-if="isMenuOpen" :class="menuPositionClass" role="menu" ref="menuRef"
          class="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
          <li v-for="(item, index) in postList" :key="index" role="menuitem"
            class="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
            <i :class="item.icon"></i>&ensp;{{ item.label }}
          </li>
        </ul>
      </div>
    </template>
    <div class="my-3">
      <div class="card">
        <Carousel :value="products" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions" circular
          :autoplayInterval="5000">
          <template #item="slotProps">
            <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
              <div class="mb-4">
                <div class="relative mx-auto">
                  <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded"
                    style="height: 300px;" />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
        <p class="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
          <Button severity="secondary" label="more" @click="toggle" />
        </p>
      </div>
    </div>
  </Panel>

</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import springFirst from "@/assets/images/spring_first.jpg";
import springSecond from "@/assets/images/spring_second.jpg";

onMounted(() => {
  products.value = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: springFirst,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: springSecond,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: springFirst,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: springSecond,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: springFirst,
    },
  ];
})
const menu = ref(null);
const toggle = (event) => {
  menu.value.toggle(event);
};
const products = ref();
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1024px',
    numVisible: 1,
    numScroll: 1
  },
]);
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
const menuPosition = ref('left'); // 菜單顯示位置，預設為 'bottom'

// 計算屬性來控制菜單位置的 class
const menuPositionClass = computed(() => {
  return menuPosition.value === 'left' ? 'top-full right-0' : 'top-0 right-full';
});

// 切換菜單顯示狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const menuRef = ref(null); // 用來參考菜單

// 定義變數和狀態
const isMenuOpen = ref(false); // 菜單開關
// 點擊外部關閉菜單
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target) && !event.target.closest('button')) {
    isMenuOpen.value = false;
  }
};

const isCommentVisible = ref(false);

const toggleComment = () => {
  isCommentVisible.value = !isCommentVisible.value;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>
