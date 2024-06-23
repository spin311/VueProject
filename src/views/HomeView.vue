<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCatDataStore } from '@/stores/catDataStore';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();
const NUM_CATS_PER_LOAD = 12;

onMounted(() => {
  // Load initial cat data
  if (store.catData.length < 1) store.loadCatData(NUM_CATS_PER_LOAD);
  window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  // Check if user has scrolled to the bottom of the page
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (nearBottom) {
    store.loadCatData(NUM_CATS_PER_LOAD);
  }
}
</script>

<template>
  <main>
    <SpinnerComponent v-if="store.isLoading" />
    <GalleryComponent :cat-data="store.catData" :center-x="'center'"></GalleryComponent>
  </main>
</template>
