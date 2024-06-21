<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>();

</script>

<template>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner"><font-awesome-icon icon="spinner" spin /></div>
  </div>
</template>

<style scoped>
.spinner {
  font-size: 5em;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>