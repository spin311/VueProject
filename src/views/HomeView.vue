<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCatDataStore } from '@/stores/catDataStore';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();

onMounted(() => {
  if (store.catData.length < 1) store.loadCatData();
  window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  // Check if user has scrolled to the bottom
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (nearBottom) {
    store.loadCatData(12);
  }
}
</script>

<template>
  <main>
    <SpinnerComponent :is-loading="store.isLoading" />
    <GalleryComponent :cat-data="store.catData" :gallery-class="'mainGallery'"></GalleryComponent>
  </main>
</template>
