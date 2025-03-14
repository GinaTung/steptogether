<template>
  <div class="flex justify-between items-center m-3">
    <div class="flex item-center">
      <Button icon="pi pi-bars" @click="toggleMenu"
      class="text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 p-2 cursor-pointer" unstyled/>
      <span class="inline-flex items-center gap-2 ms-2">
        <img :src="footstepIcon" alt="StepTogether" class="max-w-9 max-h-9" />
        <h1 class="font-black text-2xl text-primary">StepTogether</h1>
      </span>
    </div>
    <div class="flex justify-between w-100">
      <InputText placeholder="Search" type="text" class="min-w-[200px] w-full sm:w-auto" />

      <Button label="SHORE POST" class="p-2 text-white bg-[#EF6C00] rounded-lg hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 cursor-pointer" @click="toggleMenu" unstyled/>
    </div>
    <div class="flex items-center gap-2">
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
    </div>

  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/useHomeStore";
import footstepIcon from "@/assets/images/footstep.svg";
const homeStore = useHomeStore();
const toggleMenu = homeStore.toggleMenu;
</script>
