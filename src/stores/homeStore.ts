import {defineStore} from 'pinia'
import { computed, type ComputedRef, type Ref, ref, type UnwrapRef } from 'vue'
import catApi from '@/services/catApi'

export const useHomeStore = defineStore('home', () => {
  const isLoading: Ref<boolean> = ref(false);
  const catData: Ref<UnwrapRef<CatData[]>> = ref([]);
  const categories: Ref<UnwrapRef<Category[]>> = ref([]);
  const hasCatData: ComputedRef<boolean> = computed((): boolean => catData.value.length > 0);
  const hasCategories: ComputedRef<boolean> = computed((): boolean => categories.value.length > 0);

  function fetchCatData(num: number = 10): void {
    isLoading.value = true;
    catApi.fetchCatData(num).then((data: CatData[]): void => {
      catData.value = data;
      isLoading.value = false;
    });
  }

  function getCategories(): void {
    catApi.getCategories().then((data: Category[]): void => {
      categories.value = data;
    });
  }

  return {
    isLoading,
    catData,
    categories,
    hasCatData,
    hasCategories,
    fetchCatData,
    getCategories
  }
});