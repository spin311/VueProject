<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCatDataStore } from '@/stores/catDataStore'
const store = useCatDataStore();

function changeImage(change: number) {
  store.changeImageIndex(change);
}

</script>

<template>
    <div class="scrollableGallery" v-if="store.currentBreedCat">
      <div class="flex">
        <FontAwesomeIcon
          v-if="store.currentImageIndex > 0"
          icon="chevron-left"
          class="switch"
          @click="changeImage(-1)" />
        <img :src="store.currentBreedCat.url" :alt="'cat-' + store.currentBreedCat.id">
        <FontAwesomeIcon
          v-if="store.currentImageIndex < store.catBreedData.length - 1"
          icon="chevron-left" class="mirrored switch"
          @click="changeImage(1)"/>
      </div>
      <div class="progressIcons">
        <span v-for="(item, index) in store.catBreedData.length" :key="index">
              <FontAwesomeIcon v-if="index != store.currentImageIndex"
                               icon="far fa-circle"
                               class="progressIcon"
              />
              <FontAwesomeIcon v-else
                               icon="fas fa-circle"
                               class="progressIcon"
                               color="green" />
        </span>
      </div>
    </div>
</template>

<style scoped>
.progressIcons{
  margin-top: 0.5em;
}

.progressIcon {
  font-size: 1.2em;
  margin: 0.2em;

}

.mirrored {
  transform: scaleX(-1);
}

.switch {
  font-size: 2em;
  cursor: pointer;
}

img {
    width: 500px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.flex {
  display: flex;
  gap: 0.6em;
  flex-wrap: nowrap;
  align-items: center;

}
.scrollableGallery {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}
</style>