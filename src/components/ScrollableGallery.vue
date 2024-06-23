<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCatDataStore } from '@/stores/catDataStore'
import GalleryCard from '@/components/GalleryCard.vue'
import CurrentImageIndicator from '@/components/CurrentImageIndicator.vue'
const store = useCatDataStore();

// change current image index to display the next or previous image
function changeImage(change: number) {
  store.changeImageIndex(change);
}

</script>

<template>
  <div class="scrollableGallery" v-if="store.currentBreedCat">
    <div class="flex">
      <FontAwesomeIcon
        :class="{'hidden': store.currentImageIndex <= 0}"
        icon="chevron-left"
        class="switch"
        @click="changeImage(-1)" />
      <div>
        <GalleryCard :cat="store.currentBreedCat" :show-info="true" :height="'400px'" :width="'550px'" />
      </div>
      <FontAwesomeIcon
        :class="{'hidden': store.currentImageIndex >= store.catBreedData.length - 1}"
        icon="chevron-left"
        class="mirrored switch"
        @click="changeImage(1)"/>
    </div>
    <div class="progressIcons">
      <CurrentImageIndicator
        :cat-breed-len="store.catBreedData.length"
        :current-image-index="store.currentImageIndex" />
    </div>
  </div>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}

.scrollableGallery {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.6em;
}

.switch {
  font-size: 2em;
  cursor: pointer;
}

.mirrored {
  transform: scaleX(-1);
}

.progressIcons {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
}
</style>