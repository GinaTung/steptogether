<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div>
    <p>點擊次數: {{ count }}</p>
    <Button label="點我" @click="count++" />
  </div>
  <RouterView />
</template>

