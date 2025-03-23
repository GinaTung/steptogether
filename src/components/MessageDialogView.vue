<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);
const postList = ref([
  {
    label: "public",
  },
  {
    label: "private",
  },
]);
const menuPosition = ref('right'); // 菜單顯示位置，預設為 'bottom'
// 計算屬性來控制菜單位置的 class
const menuPositionClass = computed(() => {
  switch (menuPosition.value) {
    case 'top':
      return 'bottom-full left-0'; // 菜單顯示在按鈕上方
    case 'left':
      return 'top-0 right-full'; // 菜單顯示在按鈕左側
    case 'right':
      return 'top-20 left-35'; // 菜單顯示在按鈕右側
    default:
      return 'top-full left-0'; // 菜單顯示在按鈕下方
  }
});

// 切換菜單顯示狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const menuRef = ref(null); // 用來參考菜單

// 定義變數和狀態
const isMenuOpen = ref(false); // 菜單開關
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

<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    modal
    :style="{ width: '50vw' }"
    style="padding: 20px"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
  <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
      <div class="flex flex-col">
        <span class="font-bold">Amy Elsner</span>
        <div class="flex">
                  <!-- 按鈕 -->
        <button @click="toggleMenu" class="py-1 cursor-pointer" type="button">
          <span>Public</span>
          <i class="pi pi-angle-down px-1"></i>
        </button>

        <!-- 主菜單 -->
        <ul v-if="isMenuOpen" :class="menuPositionClass" role="menu" ref="menuRef"
          class="absolute z-10 min-w-[80px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
          <li v-for="(item, index) in postList" :key="index" role="menuitem"
            class="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-1 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
            {{ item.label }}
          </li>
        </ul>
        </div>

      </div>
    </div>
        <!-- <button @click="emit('update:visible', false)" class="p-2 hover:bg-gray-200 rounded-full">
          <i class="pi pi-times text-xl"></i>
        </button> -->
      </div>
    </template>
    <Textarea v-model="value" variant="filled" rows="5" cols="30" class="w-full bg-[#d0d6dd26] border-1 rounded-lg p-3 my-3"
    placeholder="What’s on your mind ?"/>

    <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Button severity="secondary" rounded><i class="pi pi-map-marker"></i>location</Button>
          <Button severity="secondary" rounded><i class="pi pi-images"></i>image</Button>
        </div>
        <Button label="SEND"
        class="p-2 text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 cursor-pointer hidden md:block"
        unstyled />
      </div>
  </Dialog>
</template>
