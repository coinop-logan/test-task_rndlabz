import {fetchPrice} from '../src/services/PriceFetch';

const id = 'the-open-network';

fetchPrice(id)
  .then((price) => {
    console.log(`The current price of ${id} is $${price}`);
  })
  .catch((error) => {
    console.error('Error fetching price:', error.message);
  });