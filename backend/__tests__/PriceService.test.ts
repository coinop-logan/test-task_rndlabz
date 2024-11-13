import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

import { fetchPrice } from '../src/services/FetchPrice';
import { getPrice } from '../src/controllers/PriceController';
import { Request, Response } from 'express';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('../src/services/FetchPrice');

// Here we mock the underlying service, but call the controller, to cover more of our plumbing.

describe('PriceController', () => {
  it('should return the correct price response for a valid label', async () => {
    // Mock the fetchPrice function
    const mockPrice = 150.25;
    (fetchPrice as jest.Mock<(id: string) => Promise<number>>).mockResolvedValue(mockPrice);

    // Create mock request and response objects
    const req = {
      query: { label: 'TON/USD' }
    } as Request<{}, {}, {}, { label: string }>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Call the controller function
    await getPrice(req, res);

    // Assert the results
    expect(fetchPrice).toHaveBeenCalledWith('the-open-network');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      label: 'TON/USD',
      price: mockPrice
    });
  });

  it('should return error for invalid label', async () => {
    // Create mock request and response objects
    const req = {
      query: { label: 'INVALID/PAIR' }
    } as Request<{}, {}, {}, { label: string }>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Call the controller function
    await getPrice(req, res);

    // Assert error handling
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'unrecognized label'
    });
  });
});
