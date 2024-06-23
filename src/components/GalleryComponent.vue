<script setup lang="ts">
import GalleryCard from '@/components/GalleryCard.vue'
import { defineProps } from 'vue'
import type { CatData } from '@/types/types'
const props = defineProps<{
  catData: CatData[],
  galleryClass: string
}>();

</script>

<template>
  <div :class="galleryClass">
    <GalleryCard v-for="cat in props.catData" :key="cat.id" :cat="cat"></GalleryCard>
  </div>
</template>

<style scoped>
.mainGallery {
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
  justify-content: center;
}
.favoritesGallery {
  margin-left: 1.2em;
  display: flex;
  gap: 0.4em;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>