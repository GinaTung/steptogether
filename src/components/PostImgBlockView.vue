<template>
  <div class="grid gap-4 grid-cols-2">
    <div v-for="postsData in postsList" :key="postsData.id" class="card">
      <Panel class="p-5 mb-5">
        <template #header>
          <div class="flex items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <div class="flex flex-col">
              <span class="font-bold">{{ postsData.author }}</span>
              <span> {{ formatDateTime(postsData.createdat) }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Button :icon="postStates[postsData.id]?.isHeartVisible ? 'pi pi-heart-fill' : 'pi pi-heart'"
                @click="toggleHeart(postsData.id)"></Button>

              <Button :icon="postStates[postsData.id]?.isCommentVisible ? 'pi pi-comments' : 'pi pi-comment'"
                severity="secondary" rounded @click="toggleComment(postsData.id)"></Button>

              <Button icon="pi pi-send" v-if="postsData.status !== '已發布'"
                :class="{ 'filled-icon': postStates[postsData.id]?.isSendVisible }" severity="secondary"
                @click="toggleSend(postsData.id)"></Button>
            </div>
            <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
          </div>
          <!-- 留言區塊 -->
          <div v-if="postStates[postsData.id]?.isCommentVisible">
            <div class="flex items-center">
              <span class="me-3"><i class="pi pi-user"></i></span>
              <Textarea v-model="value" variant="filled" rows="1" cols="30"
                class="w-full bg-[#d0d6dd26] border-1 rounded-lg p-3 my-3" placeholder="What’s on your mind ?" />
              <Button class="flex items-center cursor-pointer ms-3 hidden" unstyled>
                <i class="pi pi-send"></i>
              </Button>
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
            <Carousel v-if="Array.isArray(postsData.image_url) && postsData.image_url.length > 0"
              :value="postsData.image_url" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
              circular :autoplayInterval="5000">
              <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                  <div class="mb-4">
                    <div class="relative mx-auto">
                      <img :src="slotProps.data" class="w-full rounded" style="height: 300px" />
                    </div>
                  </div>
                </div>
              </template>
            </Carousel>
            <div class="text-container">
              <h3 class="ellipsis-multiline text-xl font-bold mb-2">{{ postsData.title }}</h3>
              <p class="ellipsis-multiline">
                {{ postsData.content }}
              </p>
              <Button severity="secondary" label="more" @click="toggle" class="text-gray-700 ms-2 font-bold"
                style="--tw-text-opacity: 1; color: rgba(239,108,0,var(--tw-text-opacity));"
                @mouseover="e => e.target.style.color = '#EF6C00'" @mouseleave="e => e.target.style.color = 'gray'" />
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
import { storeToRefs } from "pinia";
import { usePostsStore } from "@/stores/postsStore";
const postsStore = usePostsStore();
const { postsList } = storeToRefs(postsStore);
import MessageDialogView from "./MessageDialogView.vue";
const visible = ref(false);

onMounted(() => {
  products.value = postsList;
  postsStore.getPostsData()
  document.addEventListener('click', handleClickOutside);
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
const postStates = ref({});

const initPostState = (postId) => {
  if (!postStates.value[postId]) {
    postStates.value[postId] = {
      isHeartVisible: false,
      isCommentVisible: false,
      isSendVisible: false,
    };
  }
};

const toggleHeart = (postId) => {
  initPostState(postId);
  postStates.value[postId].isHeartVisible = !postStates.value[postId].isHeartVisible;
};

const toggleComment = (postId) => {
  initPostState(postId);
  postStates.value[postId].isCommentVisible = !postStates.value[postId].isCommentVisible;
};

const toggleSend = (postId) => {
  initPostState(postId);
  postStates.value[postId].isSendVisible = !postStates.value[postId].isSendVisible;
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<style>
.text-container {
  display: flex;
  flex-wrap: wrap;
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
