import { NextApiRequest, NextApiResponse } from 'next';
import { convex } from '../../convex/_generated/client';

// Fetch products from Convex database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await convex.query('listProducts')();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
