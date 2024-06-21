<script setup lang="ts">
import ImageActions from '@/components/ImageActions.vue';
import { useHomeStore } from '@/stores/homeStore';
import type { CatData } from '@/types/types';
import axios from 'axios';
const props = defineProps<{
  cat: CatData
}>();

const { toggleFavorite } = useHomeStore();

function OnFavoriteChange() {
  toggleFavorite(props.cat.id);
}

function OnCopyImage() {
  //copy cat.url to clipboard
  navigator.clipboard.writeText(props.cat.url);
  //TODO: show a banner message

}

const OnDownloadImage = () => {
  const proxyUrl = `http://localhost:3000/download?url=${encodeURIComponent(props.cat.url)}`;

  axios({
    url: proxyUrl,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', props.cat.url.split('/').pop() || 'cat.jpg');
    document.body.appendChild(link);
    link.click();
  }).catch((error) => {
    console.error('Error downloading the image: ', error);
  });
};

</script>

<template>
  <div class="cat-item">
    <div class="card">
      <img :src="cat.url" :alt="'cat-' + cat.id" />
      <ImageActions :is-favorite="cat.isFavorite"
                    @favorite-change="OnFavoriteChange"
                    @copy-image="OnCopyImage"
                    @download-image="OnDownloadImage"/>
    </div>
  </div>
</template>

<style scoped>

.card {
  border: 2px solid #484646;
  border-radius: 10px;
  padding: 10px 10px 5px;
  background-color: #eeeff1;

}

.cat-item {
  flex: 0 0 23%;
  max-width: 300px;
  max-height: 300px;
  margin: 1%;
  box-sizing: border-box;
}

img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>