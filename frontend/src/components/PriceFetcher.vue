<template>
  <div>
    <input v-model="symbol" placeholder="Enter cryptocurrency symbol" />
    <button @click="fetchPrice">Get Price</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { usePriceStore } from '../store';
import { fetchCryptoPrice } from '../services/api';

export default {
  setup() {
    const symbol = ref('');
    const store = usePriceStore();

    const fetchPrice = async () => {
      if (symbol.value) {
        store.setLoading(true);
        try {
          const price = await fetchCryptoPrice(symbol.value);
          if (price) {
            store.setPrice(price);
          }
        }
        catch (error) {
          store.setError("some sort of error oh jeeeeez Rick");
        }
      }
    };
    return { symbol, fetchPrice };
  }
};
</script>
