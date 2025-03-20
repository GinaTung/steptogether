<template>
  <div class="grid gap-4 grid-cols-2">
    <div v-for="(_, index) in 3" :key="index" class="card p-2">
      <Carousel :value="products" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular
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
      <div class="text-container">
        <p class="ellipsis-multiline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
        </p>
        <Button severity="secondary" label="更多" @click="toggle" class="more-btn" />
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-heart" rounded text></Button>
                <Button icon="pi pi-comment" severity="secondary" rounded text></Button>
                <Button icon="pi pi-send" severity="secondary" rounded text></Button>
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
      </div>
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
    breakpoint: '1024px',
    numVisible: 1,
    numScroll: 1
  },
]);


</script>
<style>
.text-container {
  display: flex;         
  align-items: flex-end;
  gap: 8px;              /* 讓文字和按鈕之間有一點間距 */
  max-width: 100%;      
}

.ellipsis-multiline {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline;  /* 讓 p 變成 inline，與按鈕同行 */
  max-width: 85%;  /* 控制最大寬度，避免佔滿整行 */
  vertical-align: middle;
}

.more-btn {
  display: inline-block;  /* 讓按鈕能夠跟隨在文字後面 */
  margin-left: 8px;
  vertical-align: middle;
}
</style>