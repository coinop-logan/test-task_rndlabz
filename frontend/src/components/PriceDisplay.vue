<script lang="ts">
import { onMounted } from 'vue';
import { usePriceStore } from '../store';
import { fetchCryptoPrice } from '../services/api';

export default {
  setup() {
    const fetchPrice = async (symbol: string) => {
      if (symbol) {
        store.setLoading(symbol, true);
        try {
          const price = await fetchCryptoPrice(symbol);
          if (price) {
            store.setPrice(symbol, price);
          }
        }
        catch (error) {
          store.setError(symbol, "Failed to fetch price");
        }
      }
    };

    onMounted(() => {
      fetchPrice("TON/USD");
      fetchPrice("USD/TON");
    })

    const store = usePriceStore();
    return { store };
  }
};
</script>


<template>
  <div>
    <div v-for="(token, label) in store.state">
      <div v-if="token.price !== null">
        <p>{{ label }}: {{ token.price }}</p>
      </div>
      <div v-else-if="token.loading">
        <p>{{ label }}: Loading...</p>
      </div>
      <div v-else-if="token.error">
        <p>Error loading {{ label }}: {{ token.error }}</p>
      </div>
    </div>
  </div>
</template>
