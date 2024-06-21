<script setup lang="ts">
import { useCatDataStore } from '@/stores/catDataStore'
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();
</script>

<template>
  <main>
    <h1>Favorites</h1>
    <GalleryComponent :cat-data="store.catFavorites" :gallery-class="'favoritesGallery'"></GalleryComponent>
  </main>
</template>