import {fetchPrice} from '../src/services/FetchPrice';

const id = 'the-open-network';

fetchPrice(id)
  .then((price) => {
    console.log(`The current price of ${id} is $${price}`);
    fetchPrice(id)
      .then((price) => {
        console.log(`The current price of ${id} is $${price}`);
      })
      .catch((error) => {
        console.error('Error fetching price:', error.message);
      });
  })
  .catch((error) => {
    console.error('Error fetching price:', error.message);
  });
