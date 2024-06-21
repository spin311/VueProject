<template>
  <div class="banner-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.banner-container {
  top: 0;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
  gap: 10px;
}
</style>