<script setup lang="ts">
import { useCatDataStore } from '@/stores/catDataStore'
import GalleryComponent from '@/components/GalleryComponent.vue'

const store = useCatDataStore();
</script>

<template>
  <main>
    <h1>Favorites</h1>
    <GalleryComponent v-if="store.catFavorites.length > 0" :cat-data="store.catFavorites" :gallery-class="'favoritesGallery'"></GalleryComponent>
    <div v-else>There are no favorites selected.</div>
  </main>
</template>