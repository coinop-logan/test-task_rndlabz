import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const GC_API_KEY = process.env.COINGECKO_API_KEY;
const PRICE_CACHE_EXPIRATION_TIME = Number(process.env.PRICE_CACHE_EXPIRATION_MIN) * 60 * 1000;

type PriceCache = {
  [id: string]: {price: number; timestamp: number}
}

const cache: PriceCache = {};

export const fetchPrice = async (id: string): Promise<number> => {
  const cached = cache[id];
  if (cached && Date.now() - cached.timestamp < PRICE_CACHE_EXPIRATION_TIME) {
    return cached.price;
  }
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`, {headers: {"x-cg-demo-api-key" : `${GC_API_KEY}`} });
  const price = response.data[id]["usd"];
  cache[id] = {price, timestamp: Date.now()}

  return price;
}