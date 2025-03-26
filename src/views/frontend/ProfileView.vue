<template>
  <!-- 中側區塊 (可滾動) -->
  <div class="flex-1 pt-1" :class="{
    'sm:ml-26 md:ml-75 xl:mr-75': menuVisible, // 左右兩側留白
    'ml-0 mr-0': !menuVisible,
  }">
    <div class="bg-[#d0d6dd26] p-3 inset-y-3">
      <div class="relative">
        <!-- 限制圖片高度並隱藏溢出部分 -->
        <div class="overflow-hidden">
          <img :src="forest" alt="" class="w-full h-full object-cover rounded-lg" style="height: 250px" />
        </div>
        <!-- 讓 memberImg 超出但不影響滾動條 -->
        <div class="absolute -bottom-10 left-5 w-30 h-30 z-10">
          <img :src="memberImg" alt="" class="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="ps-35 pt-5 flex">
          <h3>John Doue</h3>
          <p class="mx-2">@douejohn</p>
        </div>
        <div class="pt-5">
          <Button label="編輯個人檔案"
            class="p-2 bg-[#ebedf0] rounded-lg hover:bg-gradient-to-r hover:from-[#EF6C00] hover:to-[#EF6C00] transition-all duration-300 cursor-pointer mx-2" />
          <Button class="cursor-pointer" unstyled>
            <i class="pi pi-cog"></i>
          </Button>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="ps-35 pt-5 flex">
          <p class="me-5">113 <span>貼文</span></p>
          <p class="mx-5">113 <span>粉絲</span></p>
          <p class="mx-5">113 <span>追蹤中</span></p>
        </div>
      </div>
      <div class="flex justify-center items-center w-100 m-5">
        <Tabs v-model:value="activeTab">
          <TabList class="flex justify-center">
            <Tab v-for="tab in items" :key="tab.label" :value="tab.value" class="mx-5 my-3 w-full text-center">
              <a v-ripple @click.prevent="navigate(tab.value)"
                class="flex items-center justify-center gap-2 w-full h-full">
                <i :class="tab.icon" />
                <span>{{ tab.label }}</span>
              </a>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="0">
              <Card style="width: 25rem; overflow: hidden" class="my-5 relative group">
                <template #header>
                  <div class="relative">
                    <img alt="user header" :src="forest" class="w-full" />
                    
                    <!-- 遮罩 -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                    <!-- 按鈕區塊 -->
                    <div class="absolute inset-0 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <Button class="cursor-pointer text-white text-3xl" unstyled>
                        <i class="pi pi-heart text-3xl"></i> 3
                      </Button>
                      <Button class="cursor-pointer text-white text-2xl" unstyled>
                        <i class="pi pi-comment text-3xl"></i> 5
                      </Button>
                    </div>
                  </div>
                </template>
              </Card>
            </TabPanel>
            <TabPanel value="1">
              <Card style="width: 25rem; overflow: hidden" class="my-5 relative group">
                <template #header>
                  <div class="relative">
                    <img alt="user header" :src="forest" class="w-full" />
                    
                    <!-- 遮罩 -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                    <!-- 按鈕區塊 -->
                    <div class="absolute inset-0 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <Button class="cursor-pointer text-white text-3xl" unstyled>
                        <i class="pi pi-heart text-3xl"></i> 3
                      </Button>
                      <Button class="cursor-pointer text-white text-2xl" unstyled>
                        <i class="pi pi-comment text-3xl"></i> 5
                      </Button>
                    </div>
                  </div>
                </template>
              </Card>
            </TabPanel>


          </TabPanels>
        </Tabs>

      </div>
    </div>

  </div>
</template>

<script setup>
import forest from "@/assets/images/forest.jpg";
import memberImg from "@/assets/images/memberImg.svg";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/useHomeStore";
const homeStore = useHomeStore();
const { menuVisible } = storeToRefs(homeStore); // 這樣 `menuVisible` 會保持響應式
import { ref } from "vue";

const items = ref([
  { value: "0", label: "貼文", icon: "pi pi-table" },
  { value: "1", label: "收藏", icon: "pi pi-bookmark-fill" },
]);
const activeTab = ref("0");

function navigate(value) {
  activeTab.value = value;
}

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
.p-tabpanels {
  background: transparent;
}
::v-deep .p-tablist-tab-list {
  background: transparent !important;
}
.p-card {
  background: transparent !important;
}

</style>
