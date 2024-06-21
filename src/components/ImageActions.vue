<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isFavorite?: boolean
}>();

const emit = defineEmits(['favorite-change']);

const heartIcon = computed(() => (props.isFavorite ? 'fas fa-heart' : 'far fa-heart'));

const heartClass = computed(() => {
  return props.isFavorite ? 'favorite' : 'nonFavorite'
});
const favoriteChange = () => {
  emit('favorite-change');
}

</script>

<template>
  <div class="cardButtons">
    <font-awesome-icon :icon="heartIcon" :class="heartClass" @click="favoriteChange"/>
    <span class="card-button"></span>
  </div>
</template>

<style scoped>
.cardButtons {
  display: flex;
  justify-content: space-between;
  font-size: 2em;
}

.favorite {
  color: #ff0000;
}
.nonFavorite {
  color: #181818;
}
</style>