<script setup>
import { ref, reactive,onMounted, onBeforeUnmount } from "vue";
import { usePostsStore } from "@/stores/postsStore";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const postsStore = usePostsStore();
defineProps({ visible: Boolean });
const emit = defineEmits(["update:visible"]);

const menuRef = ref(null); // 用來參考菜單

// 定義變數和狀態
const isMenuOpen = ref(false); // 菜單開關
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target) && !event.target.closest('button')) {
    isMenuOpen.value = false;
  }
};
const initialValues = reactive({
      title: "",
      content: "",
      author: "Smith",
      category: "Friends",
      status: "已發布",
      review_status: "通過"
});
// 照片
const isImageOpen = ref(false); // 菜單開關
const toggleImage = () => {
  isImageOpen.value = !isImageOpen.value;
}
// 地點
const isLocationOpen = ref(false); // 菜單開關
const toggleLocation = () => {
  isLocationOpen.value = !isLocationOpen.value
}
const isLoading = ref(false);
const sumbitSend = async () => {
  isLoading.value = true;

  const payload = {
    ...initialValues,
  };

  const { error, message } = await postsStore.addUserPostsData(payload);

  isLoading.value = false;

  if (error) {
    toast.add({
      severity: "error",
      summary: "新增文章失敗",
      detail: message,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "新增文章成功",
      life: 3000,
    });

    // ✅ 清空表單
    Object.assign(initialValues, {
      title: "",
      content: "",
      author: "Smith",
      category: "Friends",
      status: "已發布",
      review_status: "通過"
    });

    setTimeout(() => {
      emit("update:visible", false); // ✅ 關閉 Dialog
    }, 1000);
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
  <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" modal :style="{ width: '50vw' }"
    style="padding: 20px" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
          <div class="flex flex-col">
            <span class="font-bold">Amy Elsner</span>
            <div class="flex">
              <!-- 按鈕 -->
              <span>Public</span>
            </div>

          </div>
        </div>
      </div>
    </template>
    <InputText name="initialValues.title" type="text" placeholder="想個吸引人的標題" fluid
  class="mt-3 p-2 border border-black rounded" />
    <Textarea v-model="initialValues.content" variant="filled" rows="5" cols="30"
      class="w-full bg-[#d0d6dd26] border-1 rounded-lg p-3 my-3" placeholder="今天想說什麼？" />

    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Button severity="secondary" rounded @click="toggleLocation" :style="{ color: isLocationOpen ? '#EF6C00' : '' }"
          ><i class="pi pi-map-marker"></i>location</Button>
        <Button severity="secondary" rounded @click="toggleImage" 
          :style="{ color: isImageOpen ? '#EF6C00' : '' }"><i class="pi pi-images"></i>image</Button>
      </div>
      <Button label="SEND" @click="sumbitSend"
        class="p-2 text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 cursor-pointer hidden md:block"
        unstyled />
    </div>
  </Dialog>
</template>
