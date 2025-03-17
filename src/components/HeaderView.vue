<template>
  <div class="flex justify-between items-center m-3">
    <div class="flex item-center">
      <Button @click="toggleMenu"
        class="text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 p-2 cursor-pointer hidden md:block"
        unstyled>
        <i class="pi pi-bars"></i>
      </Button>
      <router-link to="/">
        <span class="inline-flex items-center gap-2 sm:ms-2">
          <img :src="footstepIcon" alt="StepTogether" class="max-w-9 max-h-9" />
          <h1 class="font-black text-2xl text-primary">StepTogether</h1>
        </span>
      </router-link>
    </div>

    <div class="flex justify-between w-100">
      <InputText placeholder="Search" type="text" class="w-[250px] border border-black rounded-md px-2 hidden md:block"
        unstyled />

      <Button label="SHORE POST"
        class="p-2 text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 cursor-pointer hidden md:block"
        unstyled />
    </div>


    <div class="card flex justify-center">
      <Button type="button" @click="toggleMenu2" aria-haspopup="true" aria-controls="overlay_menu">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"
          class="cursor-pointer" />
      </Button>
      <Menu ref="menuRef" :model="menuList" class="w-full md:w-50" :popup="true">
        <template #start>
          <div class="flex items-center gap-3 mx-3 border-b-1 py-3 border-[#94a3b8]">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"
              shape="circle" />
            <span class="inline-flex md:flex-col items-start">
              <span class="font-bold">Amy Elsner</span>
              <span class="text-sm mx-2 md:mx-0">@douejohn</span>
            </span>
          </div>

        </template>
      </Menu>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHomeStore } from "@/stores/useHomeStore";
import { useRouter } from "vue-router";
import footstepIcon from "@/assets/images/footstep.svg";
const router = useRouter();
const homeStore = useHomeStore();
const toggleMenu = homeStore.toggleMenu;
// 假設使用者名稱是 "奘太"
const menuRef = ref(null);

const toggleMenu2 = (event) => {
  if (menuRef.value) {
    menuRef.value.toggle(event);
  }
};

const menuList = ref([
  {
    label: "Shore Post",
    icon: "pi pi-plus-circle",
    command: () => {
      router.push("/");
    },
  },
  { label: 'Profile', icon: 'pi pi-users' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { label: 'Logout', icon: 'pi pi-sign-out' },
]);


</script>
<style>
.p-tieredmenu-item-link {
  padding: 10px !important;
}

.p-menu-list {
  padding: 12px;
}

.p-menu-item-link {
  padding: 6px;
}
</style>