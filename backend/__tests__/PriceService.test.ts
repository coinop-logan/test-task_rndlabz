// __tests__/priceService.test.ts
import { fetchPrice } from '../src/services/FetchPrice';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('../src/services/FetchPrice');

describe('getCurrentPrice', () => {
  it('should return the correct price for a given symbol', async () => {

    // Mock the fetchPrice function
    const mockPrice = 150.25;
    (fetchPrice as jest.Mock<(id: string) => Promise<number>>).mockResolvedValue(mockPrice);

    // Call the function with a test symbol
    const symbol = 'TON/USD';
    const result = await fetchPrice(symbol);

    // Assert the results
    expect(fetchPrice).toHaveBeenCalledWith(symbol);
    expect(result).toBe(mockPrice);
  })
});
