<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatDataStore } from '@/stores/catDataStore';
import GalleryCard from "@/components/GalleryCard.vue";
import SpinnerComponent from '@/components/SpinnerComponent.vue';

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
    <div class="cat-gallery">
      <GalleryCard v-for="cat in store.catData" :key="cat.id" :cat="cat"></GalleryCard>
    </div>
  </main>
</template>

<style scoped>
.cat-gallery {
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
