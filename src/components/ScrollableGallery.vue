<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCatDataStore } from '@/stores/catDataStore'
import GalleryCard from '@/components/GalleryCard.vue'
const store = useCatDataStore();

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
        <GalleryCard :cat="store.currentBreedCat" :show-info="true" :height="'400px'" :width="'550px'"></GalleryCard>
      </div>
      <FontAwesomeIcon
        :class="{'hidden': store.currentImageIndex >= store.catBreedData.length - 1}"
        icon="chevron-left"
        class="mirrored switch"
        @click="changeImage(1)"/>
    </div>
    <div class="progressIcons">
      <span v-for="(item, index) in store.catBreedData.length" :key="index">
        <FontAwesomeIcon v-if="index !== store.currentImageIndex"
                         icon="far fa-circle"
                         class="progressIcon" />
        <FontAwesomeIcon v-else
                         icon="fas fa-circle"
                         class="progressIcon"
                         color="green" />
      </span>
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

.progressIcon {
  font-size: 1.2em;
  margin: 0.2em;
}
</style>