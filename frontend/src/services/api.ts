import axios from 'axios';

export const fetchCryptoPrice = async (label: string): Promise<number | null> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/price?label=${label}`);
    return response.data.price;
  } catch (error) {
    console.error('Failed to fetch price:', error);
    return null;
  }
};