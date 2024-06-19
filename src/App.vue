<script setup lang="ts">
</script>

<template>
  <nav>
    <ul class="nav-links">
      <li><router-link to="/" active-class="active">Home</router-link></li>
      <li><router-link to="/shop" active-class="active">Shop</router-link></li>
    </ul>
    </nav>
  <router-view/>
</template>


<style scoped>
</style>