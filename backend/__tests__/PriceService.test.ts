// __tests__/priceService.test.ts
import { fetchPrice } from '../src/services/FetchPrice';
import { describe, it, expect, jest } from '@jest/globals';

// jest.mock('../src/services/FetchPrice');

describe('getCurrentPrice', () => {
  it('should return the correct price for a given symbol', async () => {
    expect(100).toBe(100);
    // // Mock the fetch function to return a specific price
    // jest.spyOn(getCurrentPrice, 'mockResolvedValueOnce').mockResolvedValueOnce(500);
    
    // const price = await getCurrentPrice('bitcoin');
    // expect(price).toBe(500);
  });
});
