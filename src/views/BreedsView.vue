<script setup lang="ts">
import { onMounted, type Ref, ref, type UnwrapRef, watch } from 'vue'
import { useCatDataStore } from '@/stores/catDataStore'
import type { Breed } from '@/types/types'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import ScrollableGallery from '@/components/ScrollableGallery.vue'

const store = useCatDataStore();
const CATS_PER_BREED: number = 7;
onMounted(async () => {
  if (store.catBreeds.length < 1) {
    await store.loadBreeds();
    selectedBreedId.value = store.catBreeds[0].id;
  }
  else {
    selectedBreedId.value = store.selectedBreedId;
  }

});

const selectedBreedId: Ref<UnwrapRef<string>> = ref('');
const selectedBreed: Ref<Breed | null> = ref(null);


watch(selectedBreedId, async (newBreedId) => {
  await store.loadCatBreedData(CATS_PER_BREED, newBreedId);
  selectedBreed.value = getBreedById(newBreedId);
});

function getBreedById(breedId: string): Breed {
  return store.catBreeds.find(breed => breed.id === breedId) as Breed;
}


</script>

<template>
  <main>
      <div class="center mt-1">
        <label for="breeds" class="mr-1">Select a breed: </label>
        <select id="breeds" name="breeds" v-model="selectedBreedId">
          <option v-for="breed in store.catBreeds" :key="breed.id" :value="breed.id">{{ breed.name }}</option>
        </select>
      </div>
    <SpinnerComponent v-if="store.isLoading" />
      <ScrollableGallery class="mt-1"> </ScrollableGallery>
  </main>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>