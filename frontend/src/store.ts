// store.ts
import { reactive } from 'vue';

const state = reactive({
  price: null as number | null,
  loading: false,
  error: null as string | null
});

export const usePriceStore = () => {
  const setPrice = (price: number) => {
    state.price = price;
    state.loading = false;
    state.error = null;
  };

  const setLoading = (loading: boolean) => {
    state.loading = loading;
  };

  const setError = (error: string) => {
    state.error = error;
    state.loading = false;
  };

  return {
    state,
    setPrice,
    setLoading,
    setError
  };
};
