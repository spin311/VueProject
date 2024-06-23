<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isFavorite?: boolean
}>();

// emit events to GalleryCard component to handle image actions
const emit = defineEmits(['favorite-change', 'copy-image', 'download-image']);

const heartIcon = computed(() => (props.isFavorite ? 'fas fa-heart' : 'far fa-heart'));

// if the image is marked as favorite, the heart icon is red, otherwise it is dark
const heartClass = computed(() => {
  return props.isFavorite ? 'favorite' : 'dark'
});

const favoriteChange = () => {
  emit('favorite-change');
}

function copyImage() {
  emit('copy-image');
}

function downloadImage() {
  emit('download-image');
}

</script>

<template>
  <div class="cardButtons">
    <div>
    <font-awesome-icon :icon="heartIcon" :class="heartClass" class="card-button" @click="favoriteChange" />
    <font-awesome-icon icon="far fa-paper-plane" class="dark card-button" title="Copy image" @click="copyImage" />
    </div>
    <font-awesome-icon icon="fas fa-arrow-down" class="dark card-button" title="Download" @click="downloadImage" />
  </div>
</template>

<style scoped>

.card-button {
  font-size: 1.7em;
  cursor: pointer;
  padding: 3px;
}

.cardButtons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite {
  color: #ff0000;
}
.dark {
  color: #181818;
}
</style>