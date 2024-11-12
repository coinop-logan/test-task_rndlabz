// store.ts
import { reactive } from 'vue';

interface TokenState {
  price: number | null;
  loading: boolean;
  error: string | null;
}

interface PriceState {
  [label: string]: TokenState;
}

const state = reactive<PriceState>({});

export const usePriceStore = () => {
  const initializeToken = (label: string) => {
    if (!state[label]) {
      state[label] = {
        price: null,
        loading: false,
        error: null
      };
    }
  };

  const setPrice = (label: string, price: number) => {
    initializeToken(label);
    state[label].price = price;
    state[label].loading = false;
    state[label].error = null;
  };

  const setLoading = (label: string, loading: boolean) => {
    initializeToken(label);
    state[label].loading = loading;
  };

  const setError = (label: string, error: string) => {
    initializeToken(label);
    state[label].error = error;
    state[label].loading = false;
  };

  return {
    state,
    setPrice,
    setLoading,
    setError
  };
};
