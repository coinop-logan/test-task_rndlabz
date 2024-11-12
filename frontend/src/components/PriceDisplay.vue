<template>
  <p>hi</p>
  <div v-if="store.state.price !== null">
    <p>The current price is: {{ store.state.price }}</p>
  </div>
</template>

<script lang="ts">
// import { ref } from 'vue';
import {usePriceStore} from '../store';

export default {
  setup() {
    const store = usePriceStore();
    return { store };
  }
};
</script>
