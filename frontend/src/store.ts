// store.ts
import { reactive } from 'vue';

interface TokenState {
  label: string; // not the cleanest to repeat this data here. for now this is a quick workaround related to https://github.com/vuejs/core/issues/5312
  price: number | null;
  loading: boolean;
  error: string | null;
}

interface PriceState {
  tokens: {[label: string]: TokenState};
  searchString: string;
}

const state = reactive<PriceState>({tokens:{}, searchString: ""});

export const usePriceStore = () => {
  const initializeToken = (label: string) => {
    if (!state.tokens[label]) {
      state.tokens[label] = {
        label: label,
        price: null,
        loading: false,
        error: null
      };
    }
  };

  const setPrice = (label: string, price: number) => {
    initializeToken(label);
    state.tokens[label].price = price;
    state.tokens[label].loading = false;
    state.tokens[label].error = null;
  };

  const setLoading = (label: string, loading: boolean) => {
    initializeToken(label);
    state.tokens[label].loading = loading;
  };

  const setError = (label: string, error: string) => {
    initializeToken(label);
    state.tokens[label].error = error;
    state.tokens[label].loading = false;
  };

  const updateSearchString = (token: string) => {
    state.searchString = token;
  }

  return {
    state,
    setPrice,
    setLoading,
    setError,
    updateSearchString
  };
};
