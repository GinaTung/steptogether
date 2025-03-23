<template>
  <div class="grid gap-4 grid-cols-2">
    <div v-for="(_, index) in 3" :key="index" class="card">
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
              <Button icon="pi pi-heart" rounded text></Button>
              <Button icon="pi pi-comment" severity="secondary" rounded @click="visible = true"></Button>
              <Button icon="pi pi-send" severity="secondary" rounded text></Button>
            </div>
            <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
          </div>
        </template>
        <template #icons>
          <div class="relative">
            <!-- 按鈕 -->
            <button @click="toggleMenu" class="py-2 px-4 cursor-pointer" type="button">
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
              <li
                v-for="(item, index) in postList"
                :key="index"
                role="menuitem"
                class="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <i :class="item.icon"></i>&ensp;{{ item.label }}
              </li>
            </ul>
          </div>
        </template>
        <div class="my-3">
          <div class="card">
            <Carousel
              :value="products"
              :numVisible="1"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
              circular
              :autoplayInterval="5000"
            >
              <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                  <div class="mb-4">
                    <div class="relative mx-auto">
                      <img
                        :src="slotProps.data.image"
                        :alt="slotProps.data.name"
                        class="w-full rounded"
                        style="height: 300px"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </Carousel>
            <div class="text-container">
              <p class="ellipsis-multiline">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <Button severity="secondary" label="更多" @click="toggle" class="more-btn" />
            </div>
          </div>
        </div>
      </Panel>
      <MessageDialogView v-model:visible="visible"></MessageDialogView>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import springFirst from "@/assets/images/spring_first.jpg";
import springSecond from "@/assets/images/spring_second.jpg";
import MessageDialogView from "./MessageDialogView.vue";
const visible = ref(false);
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
});
const menu = ref(null);
const toggle = (event) => {
  menu.value.toggle(event);
};
const products = ref();
const responsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 1,
    numScroll: 1,
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

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<style>
.text-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  /* 讓文字和按鈕之間有一點間距 */
  max-width: 100%;
}

.ellipsis-multiline {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline;
  /* 讓 p 變成 inline，與按鈕同行 */
  max-width: 85%;
  /* 控制最大寬度，避免佔滿整行 */
  vertical-align: middle;
}

.more-btn {
  display: inline-block;
  /* 讓按鈕能夠跟隨在文字後面 */
  margin-left: 8px;
  vertical-align: middle;
}
</style>
