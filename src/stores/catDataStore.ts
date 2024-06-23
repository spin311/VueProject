import {defineStore} from 'pinia';
import { computed, type ComputedRef, type Ref, ref, type UnwrapRef, watch } from 'vue'
import type { Breed, CatData } from '@/types/types'
import { fetchBreeds, fetchCatData } from '@/services/catService'

export const useCatDataStore = defineStore('catData', () => {
  const isLoading: Ref<boolean> = ref(false);
  const catData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const catFavorites: Ref<UnwrapRef<CatData[]>> = ref([]);
  const currentBreedCat: ComputedRef<CatData> = computed((): CatData => catBreedData.value[currentImageIndex.value]);
  const selectedBreedId: ComputedRef<string> = computed((): string => {
    if (catBreedData.value.length > 0 && catBreedData.value[0]?.breeds) {
      return catBreedData.value[0]?.breeds[0]?.id;
    }
    return '';
  });
  const catBreedData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const catBreeds:  Ref<UnwrapRef<Breed[]>> = ref([]);
  const currentImageIndex: Ref<number> = ref(0);


  watch (catBreedData, (): void => {
    currentImageIndex.value = Math.floor(catBreedData.value.length / 2);
  });

  function toggleFavorite(catId: string): void {
    const catIndex: number = catData.value.findIndex((cat: CatData): boolean => cat.id === catId);
    if (catIndex === -1) return;
    catData.value[catIndex].isFavorite = !catData.value[catIndex].isFavorite;

    if (catData.value[catIndex].isFavorite) {
      catFavorites.value.push(catData.value[catIndex]);
    } else {
      const favoriteIndex: number = catFavorites.value.findIndex((cat: CatData): boolean => cat.id === catId);
      if (favoriteIndex !== -1) {
        catFavorites.value.splice(favoriteIndex, 1);
      }
    }
  }

  function changeImageIndex(change: number): void {
    const newIndex: number = currentImageIndex.value + change;
    if (newIndex < 0 || newIndex > catBreedData.value.length - 1) return;
      currentImageIndex.value  = newIndex;
  }

  async function loadCatData(num: number = 20): Promise<void> {
    isLoading.value = true;
    const newCatData: CatData[] = await fetchCatData(num);
    catData.value = [...catData.value, ...newCatData];
    isLoading.value = false;
  }

  async function loadBreeds(): Promise<void> {
    catBreeds.value = await fetchBreeds();
  }

  async function loadCatBreedData(num: number = 10, breedId: string): Promise<void> {
    isLoading.value = true;
    const params: any = { limit: num };
    if (breedId) {
      params.breed_id = breedId;
    }
    catBreedData.value = await fetchCatData(20, params);
    isLoading.value = false;
  }

  return {
    isLoading,
    catData,
    catFavorites,
    catBreeds,
    catBreedData,
    currentImageIndex,
    selectedBreedId,
    currentBreedCat,
    changeImageIndex,
    toggleFavorite,
    loadCatData,
    loadBreeds,
    loadCatBreedData
  }
});