<script lang="ts">
import { onMounted } from 'vue';
import { usePriceStore } from '../store';
import { fetchCryptoPrice } from '../services/api';
import { tokens } from '../../../config/tokens';

export default {
  setup() {
    const store = usePriceStore();

    const updateStoreSearchString = (event: Event) => {
      const target = event.target as HTMLInputElement;
      store.updateSearchString(target.value);
    };


    const fetchPrice = async (symbol: string) => {
      if (symbol) {
        store.setLoading(symbol, true);
        try {
          console.log('fetching');
          const price = await fetchCryptoPrice(symbol);
          console.log('fetched', price);
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
      tokens.forEach(token => {
        fetchPrice(token.label);
      });
    })

    return {
      store,
      updateStoreSearchString
    };
  }
};
</script>

<template>
  <div>
    <div class="search-container">
      <input 
        type="text"
        :value="store.state.searchString"
        @input="updateStoreSearchString"
        placeholder="Search tokens..."
      />
    </div>
    <table style="margin:auto; padding:25px">
      <tbody>
        <tr v-for="(token, label) in store.state.tokens" :key="label">
          <template v-if="store.state.searchString == '' || token.label.toLowerCase().includes(store.state.searchString.toLowerCase())">
            <template v-if="token.price !== null">
              <td>{{ label }}</td>
              <td>{{ token.price }}</td>
            </template>
            <template v-else-if="token.loading">
              <td>{{ label }}</td>
              <td>Loading...</td>
            </template>
            <template v-else-if="token.error">
              <td>{{ label }}</td>
              <td class="error">{{ token.error }}</td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
