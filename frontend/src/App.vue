<script setup lang="ts">
  import PriceDisplay from './components/PriceDisplay.vue';
</script>

<template>
  <div id="app">
    <h1>Cryptocurrency Price Checker</h1>
    <PriceDisplay />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>