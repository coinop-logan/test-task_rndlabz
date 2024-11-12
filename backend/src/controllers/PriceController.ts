// controllers/priceController.ts
import { Request, Response } from 'express';
import { fetchPrice } from '../services/FetchPrice';

export const getPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const price = await fetchPrice(id);
    res.status(200).json({ id, price });
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ error: 'Failed to fetch price' });
  }
};
