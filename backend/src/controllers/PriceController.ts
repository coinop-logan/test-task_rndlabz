// controllers/priceController.ts
import { Request, Response } from 'express';
import { fetchPrice } from '../services/FetchPrice';
import { getTokenConfigByLabel } from '../../../common/GetToken'

interface RequestQuery {
  label : string
}

export const getPrice = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { label } = req.query;
  const tokenConfig = getTokenConfigByLabel(label);
  if (!tokenConfig) {
    console.log(label);
    res.status(500).json({error: 'unrecognized label'});
  }
  else {
    try {
      const price = await fetchPrice(tokenConfig.id);
      if (tokenConfig.inverted) {
        res.status(200).json({ label, price: 1/price });
      }
      else {
        res.status(200).json({ label, price });
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      res.status(500).json({ error: 'Failed to fetch price' });
    }
  }

};
