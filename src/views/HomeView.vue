<script setup lang="ts">
import catApi from '../services/catApi';
import { onMounted, type Ref, ref, type UnwrapRef } from 'vue'
let catData: Ref<UnwrapRef<CatData[]>> = ref([]);
let isLoading: Ref<boolean> = ref(false);

function fetchCatData(numCats: number = 40) {
  isLoading.value = true;
  catApi.fetchCatData(numCats).then((data: CatData[]) => {
    isLoading.value = false;
    catData.value = data;
  });
}

onMounted(() => {
  fetchCatData();
});
</script>

<template>
  <main>
    <h1>Cat Gallery</h1>
    <div v-if="isLoading">Loading...</div>
    <div class="cat-gallery">
      <div v-for="cat in catData" :key="cat.id">
        <div class="cat-item">
          <img :src="cat.url" :alt="'cat-' + cat.id" />
        </div>
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

.cat-item {
  flex: 0 0 25%;
  max-width: 300px;
  max-height: 300px;
  margin: 1%;
  box-sizing: border-box;
}

img {
  width: 100%;
  width: 200px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
