<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatDataStore } from '@/stores/catDataStore';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();

onMounted(() => {
  if (!store.hasCatData)    store.loadCatData();
  if (!store.hasCategories) store.loadCategories();
});
</script>

<template>
  <main>
    <h1>Cat Gallery</h1>
    <SpinnerComponent :is-loading="store.isLoading" />
    <GalleryComponent :cat-data="store.catData" :gallery-class="'mainGallery'"></GalleryComponent>
  </main>
</template>
