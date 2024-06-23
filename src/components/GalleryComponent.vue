<script setup lang="ts">
import GalleryCard from '@/components/GalleryCard.vue'
import { defineProps } from 'vue'
import type { CatData } from '@/types/types'
const props = defineProps<{
  catData: CatData[],
  centerX: string
}>();

</script>

<template>
  <div class="gallery" :style="{ justifyContent: centerX }">
    <GalleryCard v-for="cat in props.catData" :key="cat.id" :cat="cat" :show-info="false" :height="'250px'" :width="'350px'"></GalleryCard>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
}

</style>