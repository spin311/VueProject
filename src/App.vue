<script setup lang="ts">
</script>

<template>
  <nav>
    <ul class="nav-links">
      <li><router-link to="/" active-class="active">Home</router-link></li>
      <li><router-link to="/breeds" active-class="active">Breeds</router-link></li>
      <li><router-link to="/favorites" active-class="active">Favorites</router-link></li>
    </ul>
  </nav>
  <router-view/>
</template>


<style scoped>
</style>