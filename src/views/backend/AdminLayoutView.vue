<template>
  <!-- 內部內容，超出時才滾動 -->
  <div
    class="sm:w-20 md:w-70 h-[calc(100vh-56px)] bg-[#d0d6dd26] flex flex-col fixed left-0 top-[56px] bottom-3 inset-y-3 m-3 hidden xl:block">
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
    </div>
  </div>
  <div
      class="flex-1 overflow-y-auto pt-1 mt-[64px] sm:ml-26 md:ml-75 xl:mr-10 ml-0 mr-0"
    >
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();

const menuList = ref([
  {
    label: "會員管理",
    icon: "pi pi-home",
    route: "/admin/home",
    command: () => {
      router.push("/admin/home");
    },
  },
  {
    label: "文章管理",
    icon: "pi pi-users",
    route: "/admin/friends",
    command: () => {
      router.push("/admin/friends");
    },
  },
  {
    label: "好友管理",
    icon: "pi pi-video",
    route: "/admin/videos",
    command: () => {
      router.push("/admin/videos");
    },
  },
  {
    label: "留言管理",
    icon: "pi pi-book",
    route: "/admin/learns",
    command: () => {
      router.push("/admin/learns");
    },
  },
  {
    label: "群組管理",
    icon: "pi pi-palette",
    route: "/admin/arts",
    command: () => {
      router.push("/admin/arts");
    },
  },
]);

</script>