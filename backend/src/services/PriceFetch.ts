import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const cgApiKey = process.env.COINGECKO_API_KEY;
console.log(cgApiKey)

export const fetchPrice = async (id: string): Promise<number> => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`, {headers: {"x-cg-demo-api-key" : `${cgApiKey}`} });
  return response.data[id]["usd"];
}