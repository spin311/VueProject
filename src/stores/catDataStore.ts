import {defineStore} from 'pinia';
import { computed, type ComputedRef, type Ref, ref, type UnwrapRef } from 'vue';
import type { CatData, Category } from '@/types/types';
import { fetchCatData, fetchCategories } from '@/services/catService'

export const useCatDataStore = defineStore('catData', () => {
  const isLoading: Ref<boolean> = ref(false);
  const catData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const categories: Ref<UnwrapRef<Category[]>> = ref([]);
  const hasCatData: ComputedRef<boolean> = computed((): boolean => catData.value.length > 0);
  const hasCategories: ComputedRef<boolean> = computed((): boolean => categories.value.length > 0);
  const catFavorites: ComputedRef<CatData[]> = computed((): CatData[] => catData.value.filter((cat: CatData): boolean => !!cat.isFavorite));

  function toggleFavorite(catId: string): void {
    const catIndex: number = catData.value.findIndex((cat: CatData): boolean => cat.id === catId);
    catData.value[catIndex].isFavorite = !catData.value[catIndex].isFavorite;
  }

  async function loadCatData(num: number = 20): Promise<void> {
    isLoading.value = true;
    catData.value = await fetchCatData(num);
    isLoading.value = false;
  }

  async function loadCategories(): Promise<void> {
   categories.value = await fetchCategories();
  }

  return {
    isLoading,
    catData,
    catFavorites,
    categories,
    hasCatData,
    hasCategories,
    toggleFavorite,
    loadCatData,
    loadCategories
  }
});