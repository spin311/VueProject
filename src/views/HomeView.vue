<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatDataStore } from '@/stores/catDataStore';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();

onMounted(() => {
  if (store.catData.length < 1) store.loadCatData();
});
</script>

<template>
  <main>
    <SpinnerComponent :is-loading="store.isLoading" />
    <GalleryComponent :cat-data="store.catData" :gallery-class="'mainGallery'"></GalleryComponent>
  </main>
</template>
