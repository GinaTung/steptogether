<template>
  <div class="card">
      <Carousel :value="products" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="5000">
          <template #item="slotProps">
              <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
                  <div class="mb-4">
                      <div class="relative mx-auto">
                          <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" style="height: 300px;" />
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
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-heart" rounded text></Button>
                <Button icon="pi pi-comment" severity="secondary" rounded text></Button>
                <Button icon="pi pi-send" severity="secondary" rounded text></Button>
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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


</script>
