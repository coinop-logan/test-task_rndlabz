import { mount } from '@vue/test-utils';
import PriceDisplay from '../src/components/PriceDisplay.vue';
import { describe, it, expect, jest } from '@jest/globals';
import * as flushPromises from 'flush-promises';

// Mock the API call in the component
jest.mock('../src/services/api', () => ({
  fetchCryptoPrice: jest.fn((label: string) => {
    if (label === 'TON/USD') return Promise.resolve(1.5);
    if (label === 'USD/TON') return Promise.resolve(0.67);
    return Promise.resolve(0);
  }),
}));

describe('PriceDisplay', () => {
  it('fetches and displays prices on mount', async () => {
    const wrapper = mount(PriceDisplay);

    // Wait for the component to fetch and render the prices
    await flushPromises();
    await wrapper.vm.$nextTick();

    // Assert that both prices are displayed
    const text = wrapper.text();
    console.log('html', wrapper.html());
    expect(text).toContain('TON/USD: 1.5');
    expect(text).toContain('USD/TON: 0.67');
  });
});
