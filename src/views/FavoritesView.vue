<script setup lang="ts">
import { useCatDataStore } from '@/stores/catDataStore'
import GalleryComponent from '@/components/GalleryComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useCatDataStore();
</script>

<template>
  <main>
    <GalleryComponent v-if="store.catFavorites.length > 0" :cat-data="store.catFavorites" :gallery-class="'favoritesGallery'"></GalleryComponent>
    <div v-else class="no-favorites">
      <FontAwesomeIcon icon="far fa-heart" class="heart"/>
      <span>There are no favorites selected.</span>
    </div>
  </main>
</template>

<style scoped>
.heart {
  font-size: 2em;
}

.no-favorites {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5em;
}
</style>