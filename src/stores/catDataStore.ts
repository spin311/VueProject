import {defineStore} from 'pinia';
import { computed, type ComputedRef, type Ref, ref, type UnwrapRef, watch } from 'vue'
import type { Breed, CatData } from '@/types/types'
import { fetchBreeds, fetchCatData } from '@/services/catService'

// storage for catData, catFavorites, catBreeds, catBreedData, currentImageIndex
export const useCatDataStore = defineStore('catData', () => {

  // cat data
  const isLoading: Ref<boolean> = ref(false);
  const catData: Ref<UnwrapRef<CatData[]>> = ref([]);
  // favorites array, to keep order of favorites
  const catFavorites: Ref<UnwrapRef<CatData[]>> = ref([]);

  // breed data
  const currentBreedCat: ComputedRef<CatData> = computed((): CatData => catBreedData.value[currentImageIndex.value]);
  // id of the breed in catBreedData to set as value in the select
  const selectedBreedId: ComputedRef<string> = computed((): string => {
    if (catBreedData.value.length > 0 && catBreedData.value[0]?.breeds) {
      return catBreedData.value[0]?.breeds[0]?.id;
    }
    return '';
  });
  const catBreedData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const catBreeds:  Ref<UnwrapRef<Breed[]>> = ref([]);
  // index of the currently displayed image in the catBreedData array
  const currentImageIndex: Ref<number> = ref(0);

  // when breed data changes, set the current image index to the middle of the new data
  watch (catBreedData, (): void => {
    currentImageIndex.value = Math.floor(catBreedData.value.length / 2);
  });

  // toggle favorite status and add/remove from favorites list
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

  // change the current image index by the change value
  function changeImageIndex(change: number): void {
    const newIndex: number = currentImageIndex.value + change;
    if (newIndex < 0 || newIndex > catBreedData.value.length - 1) return;
      currentImageIndex.value  = newIndex;
  }

  // load cat data and add to existing data
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
    catBreedData.value = await fetchCatData(num, params);
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