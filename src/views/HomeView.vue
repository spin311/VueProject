<script setup lang="ts">
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/homeStore'
const store = useHomeStore();

onMounted(() => {
  if (!store.hasCatData)    store.fetchCatData();
  if (!store.hasCategories) store.getCategories();
});
</script>

<template>
  <main>
    <h1>Cat Gallery</h1>
    <div v-if="store.isLoading" class="spinner-container">
      <div class="spinner"><font-awesome-icon icon="spinner" spin /></div>
    </div>
    <div class="cat-gallery">
      <div v-for="cat in store.catData" :key="cat.id" class="cat-item">
          <img :src="cat.url" :alt="'cat-' + cat.id" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.cat-gallery {
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
  justify-content: center;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  font-size: 5em;

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
  width: 300px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
