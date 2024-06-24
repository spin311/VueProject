<script setup lang="ts">
import ImageActions from '@/components/ImageActions.vue';
import { useCatDataStore } from '@/stores/catDataStore';
import { BannerType, type CatData } from '@/types/types'
import { downloadImage } from '@/services/catService'
import { useBannerStore } from '@/stores/bannerStore'
const props = defineProps<{
  cat: CatData,
  showInfo: boolean,
  width: string,
  height: string
}>();

const { toggleFavorite } = useCatDataStore();
const { addBannerMessage } = useBannerStore();

// Toggle the favorite status of current catData item
function OnFavoriteChange() {
  toggleFavorite(props.cat.id);
}

// Copy the image URL to the clipboard
function OnCopyImage() {
  navigator.clipboard.writeText(props.cat.url);
  addBannerMessage('image URL copied to clipboard', BannerType.INFO);

}

const OnDownloadImage = () => {
  // call the downloadImage function from the catService
  downloadImage(props.cat.url);
};

</script>

<template>
  <div class="cat-item" :style="{ maxWidth: props.width }">
    <div class="card">
      <h1 v-if="props.showInfo && cat.breeds" class="infoText bold"> {{ cat.breeds[0].name }}</h1>
      <img :src="cat.url" :alt="'cat-' + cat.id" :style="{ height: props.height }" />
      <div v-if="props.showInfo && cat.breeds" class="infoText">
        <p><span class="bold">Temperament:</span> {{ cat.breeds[0].temperament }}</p>
        <p class="mt-1" id="imageDescription"> {{  cat.breeds[0].description }}</p>
        <p class="mt-2"><span class="bold">Image URL:</span> <a :href="cat.url" target="_blank">{{ cat.url }}</a> </p>
      </div>
      <div v-else>
        <ImageActions :is-favorite="cat.isFavorite"
                      @favorite-change="OnFavoriteChange"
                      @copy-image="OnCopyImage"
                      @download-image="OnDownloadImage"/>
      </div>

    </div>
  </div>
</template>

<style scoped>

.infoText {
  color: #181818;
}
.bold {
  font-weight: bold;
}

.card {
  border: 2px solid #484646;
  border-radius: 10px;
  padding: 10px 10px 5px;
  background-color: #eeeff1;

}

.cat-item {
  flex: 0 0 100%;
  margin: 1%;
  box-sizing: border-box;
}

img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>