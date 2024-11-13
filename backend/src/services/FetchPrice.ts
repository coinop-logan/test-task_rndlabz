import * as dotenv from 'dotenv';
import axios from 'axios';
import mongoose from 'mongoose';

dotenv.config();

const GC_API_KEY = process.env.COINGECKO_API_KEY;
const PRICE_CACHE_EXPIRATION_TIME = Number(process.env.PRICE_CACHE_EXPIRATION_MIN) * 60 * 1000;

// Define price cache schema
const priceCacheSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  timestamp: { type: Number, required: true }
});

const PriceCache = mongoose.model('PriceCache', priceCacheSchema);

// Can add multiple api calls here, ideally at the same time adding api keys into .env
const priceFetchers: ((id: string) => Promise<number>)[] = [
  async (id: string) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
      {headers: {"x-cg-demo-api-key" : `${GC_API_KEY}`}}
    );
    return response.data[id]["usd"];
  }
];

export const fetchPrice = async (id: string): Promise<number> => {
  // Check cache in database
  const cached = await PriceCache.findOne({ tokenId: id });
  
  if (cached && Date.now() - cached.timestamp < PRICE_CACHE_EXPIRATION_TIME) {
    return cached.price;
  }

  let price: number | null = null;
  
  // Try each price fetcher
  for (const fetcher of priceFetchers) {
    try {
      const result = await fetcher(id);
      console.log(`Price fetcher result: ${result}`);
      if (result) {
        price = result;
        break;
      }
    } catch (error) {
      console.log(`Price fetcher failed: ${error}`);
      continue;
    }
  }

  if (price === null) {
    throw new Error('All price fetchers failed');
  }

  // Update cache in database
  await PriceCache.findOneAndUpdate(
    { tokenId: id },
    { price, timestamp: Date.now() },
    { upsert: true }
  );

  return price;
}