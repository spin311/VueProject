<script setup lang="ts">
import type { Banner } from '@/types/types';
import { defineProps, onMounted } from 'vue'
const props = defineProps<{
  banner: Banner
}>();

const emit = defineEmits(['close-banner']);
const CLOSE_BANNER_TIME: number = 3000;
const closeBanner = () => {
  emit('close-banner', props.banner);
}

const bannerClass = {
    banner: true,
    error: props.banner.type === 'error',
    success: props.banner.type === 'success',
    info: props.banner.type === 'info',
}

onMounted(() => {
  setTimeout(closeBanner, CLOSE_BANNER_TIME);
});

</script>

<template>
  <div :class="bannerClass">
    <div class="x-button" @click="closeBanner">X</div>
    {{ banner.message }}
  </div>

</template>

<style scoped>

.banner {
  padding: 10px;
  margin: 10px;
  border-radius: 7px;
  z-index: 10;
}

.x-button {
  float: right;
  cursor: pointer;
  border: 1px solid;
  padding: 2px 5px;
  margin-left: 10px;
  border-radius: 2px;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #8f323b;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 2px solid #c3e6cb;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 2px solid #2b7a78;
}

</style>