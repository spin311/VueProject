<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  catBreedLen: number,
  currentImageIndex: number
}>();
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
      <span v-for="(_, index) in props.catBreedLen" :key="index">
        <FontAwesomeIcon v-if="index !== props.currentImageIndex"
                         icon="far fa-circle"
                         class="progressIcon" />
        <FontAwesomeIcon v-else
                         icon="fas fa-circle"
                         class="progressIcon"
                         color="green" />
      </span>
</template>

<style scoped>
.progressIcon {
  font-size: 1.2em;
  margin: 0.2em;
}
</style>