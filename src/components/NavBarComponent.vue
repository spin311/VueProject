<script setup lang="ts">
import type { Banner } from '@/types/types';
import { useCatDataStore } from '@/stores/catDataStore'
import BannerComponent from '@/components/BannerComponent.vue';
import BannerContainer from '@/components/BannerContainer.vue';
import { useBannerStore } from '@/stores/bannerStore'

const { banners, removeBanner } = useBannerStore();

function OnCloseBanner(banner: Banner) {
  removeBanner(banner);
}

</script>

<template>
  <nav>
    <ul class="nav-links">
      <li><router-link to="/" active-class="active">Home</router-link></li>
      <li><router-link to="/breeds" active-class="active">Breeds</router-link></li>
      <li><router-link to="/favorites" active-class="active">Favorites</router-link></li>
    </ul>
  </nav>
  <BannerContainer v-if="banners">
    <BannerComponent v-for="banner in banners" :key="banner.id" :banner="banner" @close-banner="OnCloseBanner" />
  </BannerContainer>
</template>

<style scoped>

</style>